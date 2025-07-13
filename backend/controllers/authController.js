const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const Employee = require("../models/Employee");
const Intern = require("../models/Intern");

const getModelByRole = (role) => {
  switch (role) {
    case "admin": return Admin;
    case "employee": return Employee;
    case "intern": return Intern;
    default: return null;
  }
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  const Model = getModelByRole(role);
  if (!Model) return res.status(400).json({ message: "Invalid role" });

  try {
    const user = await Model.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.json({ token, user: { name: user.name, email: user.email, role } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
