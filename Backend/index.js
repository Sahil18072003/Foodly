require("dotenv").config();
const express = require("express");
const connectDb = require("./database");
const authRoute = require("./routes/auth-route");
var cors = require("cors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./Models/User-model"); // Adjust the extension based on your file type

const app = express();

app.use(cors());

const PORT = 5000;

app.use(express.json());

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID:
//         "773695330225-rj3orcufnett9df8hmenhkihptib1ogd.apps.googleusercontent.com",
//       clientSecret: "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",
//       callbackURL: "http://localhost:3000/auth/google/home",
//       userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//     },
//     function (accessToken, refeshToken, profile, done) {
//       console.log("Sahil Dharaviya");
//       console.log(profile);
//       User.findOne({ googleId: profile.id })
//         .then((user) => {
//           if (!user) {
//             user = new User({
//               googleId: profile.id,
//             });
//             user
//               .save()
//               .then(() => done(null, user))
//               .catch((err) => done(err));

//             //found user
//           } else {
//             done(null, user);
//           }
//         })
//         .catch((err) => done(err));
//     }
//   )
// );

app.use(passport.initialize());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/home",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/home");
  }
);

app.use("/api/auth", authRoute);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
