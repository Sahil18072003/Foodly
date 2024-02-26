require("dotenv").config();

const express = require("express");
const connectDb = require("./Configuration/database");
const CLODINARY_CONFIG = require("./Configuration/cloudinaryConfig");
const authRoute = require("./routes/auth-route");
const restaurantRoute = require("./routes/restaurant-route");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./Models/User-model"); // Adjust the extension based on your file type
const app = express();

app.use(cors());

const PORT = 5000;

CLODINARY_CONFIG();

app.use(express.json());

// app.use(
//   session({
//     secret: "ddbgdvmzxs",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

app.use(passport.initialize());

// app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },

    function (accessToken, refeshToken, profile, done) {
      console.log(profile);
      User.findOne({ email: profile.emails[0].value })
        .then((user) => {
          if (!user) {
            user = new User({
              googleId: profile.id,
              username: profile.displayName,
              email: profile.emails[0].value,
              image: profile.photos[0].value,
              isVerified: true,
            });

            user
              .save()
              .then(() => done(null, user))
              .catch((err) => done(err));

            //found user
          } else {
            done(null, user);
          }
        })
        .catch((err) => done(err));
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
    session: false,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(`${process.env.CLIENT_URL}/${req.user.token}`);
  }
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

app.use("/api/auth", authRoute);

// app.use("/api/restaurant", restaurantRoute);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
