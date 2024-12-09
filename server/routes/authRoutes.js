const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { register, login, logout, verifyToken } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", verifyToken);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/user.phonenumbers.read'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
    (req, res) => {
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.redirect(`http://localhost:3000/events?token=${token}`);
    }
);

module.exports = router;