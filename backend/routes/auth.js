// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ---------------------------
// REGISTER USER
// ---------------------------
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email, role });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // ✅ Encrypt password
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------------------
// LOGIN USER
// ---------------------------
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  console.log("Login attempt:", email, role);

  try {
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or role" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
