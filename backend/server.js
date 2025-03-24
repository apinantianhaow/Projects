const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const sharp = require("sharp");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// ====== MongoDB Connect ======
mongoose
  .connect("mongodb+srv://apxnan:Apinan1234@cluster0.je4ru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
  image: {
    data: Buffer,
    contentType: String,
  },
});

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
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

// ====== MODELS ======
const User = mongoose.model("User", UserSchema);
const Profile = mongoose.model("Profile", ProfileSchema);
const Item = mongoose.model("Item", ItemSchema);

// ====== MULTER ======
const upload = multer({ storage: multer.memoryStorage() });

// ====== REGISTER ======
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    res.status(200).json({ message: "User registered successfully!", userId: newUser._id });
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
    if (!isMatch) return res.status(400).json({ message: "The password is incorrect" });

    res.status(200).json({ message: "Success", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ====== CREATE PROFILE ======
app.post("/profile", upload.single("image"), async (req, res) => {
  try {
    const { userId, name, username } = req.body;
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
      image: imageData,
    });

    res.status(200).json({ message: "Profile created successfully." });
  } catch (error) {
    console.error("❌ Profile creation error:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
      imageUrl: profile.image
        ? `data:${profile.image.contentType};base64,${profile.image.data.toString("base64")}`
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
        data: await sharp(file.buffer).resize({ width: 552 }).jpeg({ quality: 80 }).toBuffer(),
        contentType: file.mimetype,
      }))
    );

    const newItem = await Item.create({
      ...req.body,
      images: resizedImages,
      uploadedBy: req.body.uploadedBy || null,
    });

    res.status(200).json({ message: "Item uploaded successfully", item: newItem });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});
app.get("/items/:category/:title", async (req, res) => {
  try {
    const item = await Item.findOne({
      category: req.params.category,
      title: req.params.title,
    });

    if (!item) return res.status(404).json({ message: "Item not found" });

    // 🔍 หา profile ของผู้โพสต์
    const profile = await Profile.findOne({ userId: item.uploadedBy });

    // 🔄 แปลงภาพ
    const imageList = item.images.map((img) =>
      `data:${img.contentType};base64,${img.data.toString("base64")}`
    );

    // ✅ รวมข้อมูลทั้งหมดที่ต้องส่งกลับ
    const result = {
      ...item._doc,
      images: imageList,
      uploadedBy: {
        username: profile?.username || "Unknown",
        imageUrl: profile?.image
          ? `data:${profile.image.contentType};base64,${profile.image.data.toString("base64")}`
          : null,
      },
    };

    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ====== START SERVER ======
const PORT = 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
