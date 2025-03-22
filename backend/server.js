const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const multer =  require("multer");
const sharp = require("sharp");

const app = express();
app.use(express.json());
app.use(cors());

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

//Create Schema and Model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  image: {
    data: Buffer,
    contentType: String,
  },
});

const itemSchema = new mongoose.Schema({
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
    }
  ],
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.model("User", UserSchema);
const Profile = mongoose.model('Profile', profileSchema);
const Item = mongoose.model("item", itemSchema);

// API For Register
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

// API For Sign in
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.json("No record existed");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json("The password is incorrect");

    res.json("Success");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API For Profile
const upload = multer({ storage: multer.memoryStorage() });
app.post('/profile', upload.single('image'), async (req, res) => {
  try {
    const { name, username } = req.body;
    let imageBuffer = null;
    let imageContentType = null;

    if (req.file) {
      imageBuffer = await sharp(req.file.buffer)
        .resize({ width: 1024 })  
        .jpeg({ quality: 80 })    
        .toBuffer();

        imageData = {
          data: imageBuffer,
          contentType: req.file.mimetype,
        };
    }

    const newProfile = await Profile.create({
      name,
      username,
      image: imageData,
    });

    console.log("Save success"); 
    res.status(200).json({ message: 'Profile created successfully.' });
  } catch (error) {
    console.error('Error processing profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API For Upload
app.post("/upload-item", upload.array("images"), async (req, res) => {
  try {
    const files = req.files;
    const resizedImages = [];

    for (const file of files) {
      const resized = await sharp(file.buffer)
        .resize({ width: 552 })      
        .jpeg({ quality: 80 })       
        .toBuffer();

      resizedImages.push({
        data: resized,
        contentType: file.mimetype,
      });
    }

    const newItem = await Item.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      condition: req.body.condition,
      desiredItems: req.body.desiredItems,
      desiredNote: req.body.desiredNote,
      images: resizedImages,
      uploadedBy: req.body.uploadedBy || null,
    });

    console.log("✅ Item saved");
    res.status(200).json({ message: "Item uploaded successfully", item: newItem });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});


//Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
