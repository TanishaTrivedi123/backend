const express = require("express");
const router = express.Router();
const ContactModel = require("../models/Contact.js");

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "All fields are required", success: false });
    }

    const newContact = new ContactModel({ name, email, message });
    await newContact.save();

    res.status(200).json({
      message: "Contact saved successfully!",
      event: newContact,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to save contact." });
  }
});

router.get("/contact-data", async (req, res) => {
  try {
    const contactData = await ContactModel.find().sort({ _id: -1 });
    res.status(200).json(contactData);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contact form data" });
  }
});

module.exports = router;
