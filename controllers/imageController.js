const Image = require("../models/imageModel");

const uploadImage = async (req, res) => {
  debugger;
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const { filename, mimetype, size } = req.file;
    const image = new Image({ filename });
    await image.save();

    res.json({
      file: filename,
      status: "Image uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  uploadImage,
};
