require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

//Test GET
app.get("/", (req, res) => {
  res.send("✅ GET request success!");
});

//Test POST
app.post("/test", (req, res) => {
  const { message } = req.body;
  res.json({ status: "✅ POST request success!", receivedMessage: message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));