const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
