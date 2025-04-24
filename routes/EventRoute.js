const express = require("express");
const router = express.Router();
const EventModel = require("../models/Event");
const upload = require("../middleware/upload");

router.post("/addevent", upload.single("image"), async (req, res) => {
  try {
    const { title, date, description } = req.body;
    const imagePath = req.file ? req.file.path : null; //multer image se path lega

    if (!title || !date || !imagePath) {
      return res
        .status(400)
        .json({ error: "All fields are required", success: false });
    }

    const newEvent = new EventModel({
      title,
      date,
      image: imagePath,
      description,
    });
    await newEvent.save();
    res.status(201).json({
      message: "Event added successfully!",
      event: newEvent,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
