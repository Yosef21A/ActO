const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    let profile = { user };
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let profile = { user };
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { first_name, last_name, email, phone_number } = req.body;
    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.email = email || user.email;
    user.phone_number = phone_number || user.phone_number;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profiles", error });
  }
};