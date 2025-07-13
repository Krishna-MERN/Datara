const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");

router.post("/", async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;
    const newMessage = new ContactMessage({ fullName, email, subject, message });
    await newMessage.save();
    res.status(201).json({ message: "Message submitted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
// GET all contact messages
router.get("/", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ submittedAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error("Server error while fetching contact messages:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
