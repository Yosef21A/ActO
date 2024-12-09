const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require('passport');
const session = require('express-session');
const cors = require('cors'); // Import cors
dotenv.config();
const path = require('path');

// Import passport configuration
require('./config/passport');

const app = express();
const port = process.env.PORT || 8000;

// Connect to MongoDB using the environment variables
const mongoURI = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster.aqqb8bl.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI)
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Database connection error:", err));

// Middleware
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // Configure CORS

app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import Routes
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const eventRoutes = require("./routes/eventRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const contactRoutes = require("./routes/contactRoutes");

// API Endpoints
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contact", contactRoutes);

// 404 Error Handling
app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port: ${port}`));