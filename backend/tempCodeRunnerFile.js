const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(
  "mongodb+srv://apxnan:Apinan1234@cluster0.je4ru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// JWT Secret
const JWT_SECRET = "your_jwt_secret";

// User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", UserSchema);

// Item Schema
const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  condition: { type: String, required: true },
  desiredItems: { type: String, required: true },
  desiredNote: { type: String, required: false },
  images: [{ type: String }],
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});
const Item = mongoose.model("Item", ItemSchema);

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// User Register
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    res.json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User Login (JWT)
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("No record existed");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Incorrect password");

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ message: "Success", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware to verify JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token.replace("Bearer ", ""), JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Unauthorized" });
    req.user = decoded;
    next();
  });
};

// Upload Item (Authenticated)
app.post("/uploadpage", upload.array('images', 5), authenticate, async (req, res) => {
  console.log("🔵 /uploadpage route activated!");
  try {
    const { title, description, category, condition, desiredItems, desiredNote } = req.body;
    const images = req.files.map(file => file.filename);

    const newItem = new Item({ 
      title, 
      description, 
      category, 
      condition, 
      desiredItems, 
      desiredNote,
      images,
      uploadedBy: req.user.userId
    });

    await newItem.save();
    res.status(201).json({ message: "Item uploaded successfully!", item: newItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
