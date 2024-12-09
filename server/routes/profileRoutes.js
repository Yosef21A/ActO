const express = require("express");
const router = express.Router();
const { getProfile, getProfileById, updateProfile, getAllProfiles } = require("../controllers/profileController");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware"); // Adding authorizeAdmin for admin access

// Get Profile
router.get("/", authenticate, getProfile);

// Get Profile by ID
router.get("/:id", authenticate, getProfileById);
router.put("/", authenticate, updateProfile); // Ensure this route is defined

// Get All Profiles (Admin only)
router.get("/all", authenticate, authorizeAdmin, getAllProfiles);

module.exports = router;