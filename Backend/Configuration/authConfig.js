require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./../Models/User-model");
const jwt = require("jsonwebtoken");

const GOOGLE_AUTH_CONFIG = () => {
  // Configure the Google authentication strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },

      async function (accessToken, refreshToken, profile, cb) {
        // Check if the user already exists in the database based on their email
        let user = await User.findOne({ email: profile.emails[0].value });

        // If the user doesn't exist, create a new user using Google profile information
        if (!user) {
          user = await User.create({
            email: profile.emails[0].value,
            username: profile.displayName,
            profileImage: profile.photos[0].value,
            isVerified: true,
          });
        }

        // Generate a JWT token for the authenticated user
        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET_TOKEN,
          {
            expiresIn: "5m",
          }
        );

        // Return the user and token to the Passport.js callback function
        user = { user, token };
        return cb(null, user);
      }
    )
  );
};

module.exports = {
  GOOGLE_AUTH_CONFIG,
};
