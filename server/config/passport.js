const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Initialize Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:8000/api/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      user = await User.create({
        googleId: profile.id,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        email: profile.emails[0].value,
        password: '8A8A8A8A8A', // Set default password
        phone_number: profile.phoneNumbers ? profile.phoneNumbers[0].value : '00000000', // Set default phone number if not available
      });
    }

    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

// Serialize user information into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});