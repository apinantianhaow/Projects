const expess = require("expess");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.ues(cors());
app.ues(expess.json());

const storage = multer.diskStorage({
    destination: (requestAnimationFrame, flie, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file,originalname),

});

const upload = multer({storage});

app.post("/upload", upload.single("image"), (req, res) => {
    res.json({message: "Upload successful", file: req.file.filename});

});

app.listen(5000, () => console.log("Server running on post 5000"));