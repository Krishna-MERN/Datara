const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
 // Assuming you created this
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/internship", require("./routes/internship"));

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
const contactRoutes = require("./routes/contact");
app.use("/api/contact", contactRoutes);
