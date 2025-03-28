const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const sharp = require("sharp");
const http = require("http");
const { Server } = require("socket.io");
const slugify = require("slugify");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// ====== MongoDB Connect ======
mongoose
  .connect(
    "mongodb+srv://apxnan:Apinan1234@cluster0.je4ru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ====== SCHEMAS ======
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  posts: { type: Number, required: true, default: 0 },
  followers: { type: Number, required: true, default: 0 },
  following: { type: Number, required: true, default: 0 },
  image: {
    data: Buffer,
    contentType: String,
  },
});

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: String,
  category: String,
  condition: String,
  desiredItems: String,
  desiredNote: String,
  images: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const SelectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  itemId: { type: String, required: true },
  selectedAt: { type: Date, default: Date.now },
});

const Message = mongoose.model(
  "Message",
  new mongoose.Schema({
    senderId: String,
    receiverId: String,
    text: String,
    createdAt: { type: Date, default: Date.now },
    seen: { type: Boolean, default: false },
  })
);

const User = mongoose.model("User", UserSchema);
const Profile = mongoose.model("Profile", ProfileSchema);
const Item = mongoose.model("Item", ItemSchema);
const Selection = mongoose.model("Selection", SelectionSchema);

// ====== MULTER ======
const upload = multer({ storage: multer.memoryStorage() });

// ====== REGISTER ======
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    res
      .status(200)
      .json({ message: "User registered successfully!", userId: newUser._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ====== LOGIN ======
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "No record existed" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "The password is incorrect" });

    res.status(200).json({ message: "Success", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ====== CREATE PROFILE ======
app.post("/profile", upload.single("image"), async (req, res) => {
  try {
    const { userId, name, username } = req.body;

    // console.log("Full req.body:", req.body);
    // console.log("Trades:", trades, "Followers:", followers, "Following:", following);

    let imageData = null;

    if (req.file) {
      const imageBuffer = await sharp(req.file.buffer)
        .resize({ width: 1024 })
        .jpeg({ quality: 80 })
        .toBuffer();

      imageData = {
        data: imageBuffer,
        contentType: req.file.mimetype,
      };
    }

    const newProfile = await Profile.create({
      userId,
      name,
      username,
      followers: Math.max(0, 0),
      following: Math.max(0, 0),
      posts: Math.max(0, 0),
      image: imageData,
    });

    res.status(201).json({ message: "Create Profile Success!" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Failed to create profile" });
  }
});

// ====== GET PROFILE BY USERID ======
app.get("/profile/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      name: profile.name,
      username: profile.username,
      followers: Math.max(0, profile.followers),
      following: Math.max(0, profile.following),
      posts: Math.max(0, profile.posts),
      imageUrl: profile.image
        ? `data:${
            profile.image.contentType
          };base64,${profile.image.data.toString("base64")}`
        : null,
    });
  } catch (err) {
    console.error("❌ Profile fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ====== UPLOAD ITEM ======
app.post("/upload-item", upload.array("images"), async (req, res) => {
  try {
    const resizedImages = await Promise.all(
      req.files.map(async (file) => ({
        data: await sharp(file.buffer)
          .resize({ width: 552 })
          .jpeg({ quality: 80 })
          .toBuffer(),
        contentType: file.mimetype,
      }))
    );

    const newItem = await Item.create({
      ...req.body,
      slug: slugify(req.body.title, { lower: true }),
      images: resizedImages,
      uploadedBy: req.body.uploadedBy || null,
    });

    await Profile.findOneAndUpdate(
      { userId: req.body.uploadedBy },
      { $inc: { posts: 1 } }
    );

    res
      .status(200)
      .json({ message: "Item uploaded successfully", item: newItem });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.get("/items/:category/:titleSlug", async (req, res) => {
  console.log("ITEM ROUTE HIT");
  try {
    const { category, titleSlug } = req.params;

    console.log("Incoming request:");
    console.log("Category:", category);
    console.log("Slug:", titleSlug); // ใช้ slug ในการค้นหา

    const item = await Item.findOne({
      category: new RegExp(`^${category}$`, "i"), // ✅ ไม่สนตัวพิมพ์เล็ก-ใหญ่
      slug: titleSlug,
    });

    if (!item) {
      console.log("❌ Item not found");
      return res.status(404).json({ message: "Item not found" });
    }

    // 🔍 หา profile ของผู้โพสต์
    const profile = await Profile.findOne({ userId: item.uploadedBy });

    // 🔄 แปลงภาพ
    const imageList = item.images.map(
      (img) => `data:${img.contentType};base64,${img.data.toString("base64")}`
    );

    const result = {
      ...item._doc,
      images: imageList,
      uploadedBy: {
        userId:item.uploadedBy,
        username: profile?.username || "Unknown",
        imageUrl: profile?.image
          ? `data:${
              profile.image.contentType
            };base64,${profile.image.data.toString("base64")}`
          : null,
      },
    };

    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();

    const formattedItems = items.map((item) => ({
      _id: item._id,
      category: item.category,
      title: item.title,
      slug: item.slug,
      images: item.images
        ? item.images
            .filter((img) => img?.data) // 🔍 กรองค่าที่ไม่มี `data`
            .map(
              (img) =>
                `data:${img.contentType};base64,${img.data.toString("base64")}`
            )
        : [], // ถ้าไม่มี images ให้ส่ง array ว่าง
    }));

    res.status(200).json(formattedItems);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

app.get("/items/:userId", async (req, res) => {
  try {
    const { userId } = req.params;  // ดึง userId จาก URL
    console.log("user", userId)

    // ตรวจสอบว่า userId เป็น ObjectId หรือไม่
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const items = await Item.find({ uploadedBy: userId });  // กรองข้อมูลตาม userId

    console.log("items", items)

    const formattedItems = items.map((item) => ({
      _id: item._id,
      category: item.category,
      title: item.title,
      slug: item.slug,
      images: item.images
        ? item.images
            .filter((img) => img?.data) // กรองค่าที่ไม่มี `data`
            .map(
              (img) =>
                `data:${img.contentType};base64,${img.data.toString("base64")}`
            )
        : [], // ถ้าไม่มี images ให้ส่ง array ว่าง
    }));

    res.status(200).json(formattedItems);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

app.get("/api/item-count/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const count = await Item.countDocuments({ uploadedBy: userId });
    res.json({ count });
  } catch (error) {
    console.error("Count error:", error);
    res.status(500).json({ error: "Failed to count items" });
  }
});

app.post("/addfollow", async (req, res) => {
  try {
    const { username, profilename } = req.body;
    console.log("body:", req.body);
    console.log("User:", username);
    console.log("Profile:", profilename);
    // ค้นหาผู้ใช้งานที่เป็นเจ้าของโปรไฟล์
    // const profile = await Profile.findById(profilename);
    const profile = await Profile.findOne({ userId: profilename });
    console.log("Profile:", profile);

    if (!profile) {
      throw new Error("Profile not found");
    }

    // เพิ่ม followers ในโปรไฟล์ของผู้ใช้งาน
    profile.followers += 1;

    // เพิ่ม following ในโปรไฟล์ของ user ที่จะติดตาม
    // const userProfile = await Profile.findById(username);
    const userProfile = await Profile.findOne({ userId: username });

    if (!userProfile) {
      throw new Error("User profile not found");
    }

    userProfile.following += 1;

    // บันทึกการอัปเดต
    await profile.save();
    await userProfile.save();
    res.status(200).json({ message: "Follow action completed successfully" });
  } catch (error) {
    console.error("❌ Error in follow route:", error);
    res.status(500).json({ error: "Follow action failed" });
  }
});

app.post("/removefollow", async (req, res) => {
  try {
    const { username, profilename } = req.body;
    console.log("body:", req.body);
    console.log("User:", username);
    console.log("Profile:", profilename);

    // ค้นหาผู้ใช้ที่ถูกเลิกติดตาม
    const profile = await Profile.findOneAndUpdate(
      { userId: profilename },
      { $inc: { followers: -1 } },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // ค้นหาผู้ใช้ที่ทำการเลิกติดตาม
    const userProfile = await Profile.findOneAndUpdate(
      { userId: username },
      { $inc: { following: -1 } },
      { new: true }
    );

    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    res.status(200).json({ message: "Unfollow action completed successfully" });
  } catch (error) {
    console.error("❌ Error in unfollow route:", error);
    res.status(500).json({ error: "Unfollow action failed" });
  }
});


// ====== Check Email User in databases ======
app.post("/check-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    return res.status(200).json({
      success: true,
      exists: !!user,
      message: user ? "Email found." : "Email not found.",
    });
  } catch (err) {
    console.error("❌ Email check error:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// ====== Reset-password ======
app.post("/reset-password", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save(); // Save changes

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("❌ Reset password error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// chat
app.post("/select-item", async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    await Selection.findOneAndUpdate(
      { userId },
      { itemId, selectedAt: new Date() },
      { upsert: true, new: true }
    );
    res.status(200).json({ message: "✅ Item selected and stored" });
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to select item" });
  }
});

// ดึงข้อมูล item ที่ user เลือกไว้ล่าสุด
const { Types } = require("mongoose");

app.get("/selected-item/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const record = await Selection.findOne({
      userId: new Types.ObjectId(userId),
    });

    if (!record) return res.status(404).json({ itemId: null });

    res.status(200).json({ itemId: record.itemId });
  } catch (err) {
    console.error("❌ Error fetching selected item:", err);
    res.status(500).json({ error: "Failed to get selected item" });
  }
});

app.get("/messages/:user1/:user2", async (req, res) => {
  try {
    const { user1, user2 } = req.params;
    console.log("📨 Fetching messages between:", user1, user2);

    if (!user1 || !user2) {
      return res.status(400).json({ error: "Missing user ID(s)" });
    }

    const messages = await Message.find({
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 },
      ],
    }).sort("createdAt");

    res.status(200).json(messages);
  } catch (err) {
    console.error("❌ Message fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/delete-items", async (req, res) => {
  const { item1, item2 } = req.body;
  try {
    await Item.deleteMany({ _id: { $in: [item1, item2] } });
    res.status(200).json({ message: "แลกเปลี่ยนสำเร็จ 😎🔥🫶" });
  } catch (err) {
    console.error("❌ Delete items error:", err);
    res.status(500).json({ error: "Failed to delete items" });
  }
});

app.get("/items-by-user/:userId", async (req, res) => {
  try {
    const items = await Item.find({ uploadedBy: req.params.userId });

    const formattedItems = items.map((item) => ({
      _id: item._id,
      title: item.title,
      images: item.images.map(
        (img) => `data:${img.contentType};base64,${img.data.toString("base64")}`
      ),
    }));

    res.status(200).json(formattedItems);
  } catch (err) {
    console.error("❌ Error in /items-by-user:", err);
    res.status(500).json({ error: "Failed to fetch items by user" });
  }
});

app.post("/mark-seen", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    await Message.updateMany(
      { senderId, receiverId, seen: false },
      { $set: { seen: true } }
    );
    res.status(200).json({ message: "Marked as seen" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ====== SOCKET.IO EVENTS ======
io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id);

  socket.on("send-message", async (msg) => {
    console.log("📩 Message received:", msg);
    const savedMsg = await Message.create(msg);
    io.emit("receive-message", savedMsg);
  });

  socket.on("selected-item", ({ userId, itemId }) => {
    console.log("🎯 Real-time selected-item:", userId, itemId);
    socket.broadcast.emit("selected-item", { userId, itemId });
  });

  socket.on("request-exchange-status", async ({ userId, targetId }) => {
    try {
      console.log("📥 request-exchange-status:", userId, targetId);

      // ดึงค่าจาก DB
      const Selection = mongoose.model("Selection");
      const targetConfirm = await Selection.findOne({ userId: targetId });

      if (targetConfirm) {
        socket.emit("exchange-confirm", {
          userId: targetId,
          targetId: userId,
          confirm: true,
        });
      }
    } catch (err) {
      console.error("❌ Error in request-exchange-status:", err);
    }
  });
  socket.on("reset-exchange-status", ({ userId, targetId }) => {
    io.emit("exchange-confirm", { userId, confirm: false });
  });
  socket.on("exchange-confirm", ({ userId, targetId, confirm }) => {
    socket.broadcast.emit("exchange-confirm", { userId, confirm });
  });
  socket.on("exchange-done", ({ userId, targetId }) => {
    console.log("📢 exchange-done from:", userId, "to:", targetId);

    // ส่งให้ผู้ใช้ทั้งสอง
    io.to(socket.id).emit("exchange-done", { userId, targetId }); // ให้คนส่งได้ด้วย
    socket.to(targetId).emit("exchange-done", { userId, targetId }); // ให้เป้าหมายด้วย
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// ====== Item Delete ======
app.delete("/items/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});

// ====== START SERVER ======
const PORT = 5001;
server.listen(PORT, () => {
  console.log(`🚀 Server + Socket.IO running on http://localhost:${PORT}`);
});
