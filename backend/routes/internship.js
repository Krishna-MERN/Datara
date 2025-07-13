const express = require("express");
const router = express.Router();
const InternApplication = require("../models/InternApplication");

// Submit form
router.post("/apply", async (req, res) => {
  try {
    const app = new InternApplication(req.body);
    await app.save();
    res.status(201).json({ message: "Application saved." });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all applications
router.get("/all", async (req, res) => {
  try {
    const apps = await InternApplication.find().sort({ appliedAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: "Error fetching applications" });
  }
});

module.exports = router;
