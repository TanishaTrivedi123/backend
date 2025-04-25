const express = require("express");
const router = express.Router();
const EventModel = require("../models/Event");
const upload = require("../middleware/upload");
const cloudinary = require("../Cloudinary");

router.post("/addevent", upload.single("image"), async (req, res) => {
  console.log("File received:", req.file); // Check if file is being sent
  try {
    const { title, date, description } = req.body;
    const imagePath = req.file ? req.file.path : null; // Path received from multer

    if (!title || !date || !imagePath) {
      return res
        .status(400)
        .json({ error: "All fields are required", success: false });
    }

    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);
    console.log("Cloudinary upload result:", cloudinaryResult);

    const newEvent = new EventModel({
      title,
      date,
      image: cloudinaryResult.secure_url, // Cloudinary image URL
      description,
    });

    await newEvent.save();
    res.status(201).json({
      message: "Event added successfully!",
      event: newEvent,
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
