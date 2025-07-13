const mongoose = require("mongoose");

const internSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  branch: String,
  interest: String,
  resume: String,
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("InternApplication", internSchema);
