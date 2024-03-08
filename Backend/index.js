require("dotenv").config();

const express = require("express");
const connectDb = require("./Configuration/database");
const jwt = require("jsonwebtoken");
const authRoute = require("./routes/auth-route");
const restaurantRoute = require("./routes/restaurant-route")
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./Models/User-model");
const verifyToken = require("./Middlewares/authMiddleware");
const app = express();

app.use(cors());

const PORT = 5000;

app.use(express.json());

app.use(
  session({
    secret: "ddbgdvmzxs",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());

app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },

    async function (accessToken, refeshToken, profile, done) {
      let user = await User.findOne({ email: profile.emails[0].value });

      if (!user) {
        user = await User.create({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
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

      console.log(token);

      // Return the user and token to the Passport.js callback function
      user = { user, token };
      return done(null, user);
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
    // Successful authentication
    const token = req.user.token;
    const userId = req.user.user._id;
    console.log(userId);

    // Redirect to the client-side route that handles storing the user ID
    res.redirect(`${process.env.CLIENT_URL}?user=${userId}`);
    // return res.status(200).json({ msg: "Login successfully done", token, user: userId });
  }
);



app.get("/login/success", verifyToken, (req, res) => {
  res.status(200).json({ message: "User authenticated", user: req.user });
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

app.use("/api/auth", authRoute);

app.use("/api/res", restaurantRoute);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
