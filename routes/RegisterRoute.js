const express = require("express");
const router = express.Router();
const registerModel = require("../models/Register");

router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, collegeName, branch, teamName } = req.body;

    // Check for required fields
    if (!name || !email || !phone || !collegeName || !branch || !teamName) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newRegister = new registerModel({
      name,
      email,
      phone,
      collegeName,
      branch,
      teamName,
    });

    await newRegister.save();

    return res.status(201).json({
      message: "Your data has been successfully submitted",
      register: newRegister,
      success: true,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
