const express = require("express");
const multer = require("multer");
const imageController = require("../controllers/imageController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileFormat = file.originalname.split(".")[1];
    cb(null, "AGP-" + Date.now() + "." + fileFormat);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), imageController.uploadImage);

module.exports = router;
