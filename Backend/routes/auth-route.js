require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");
const verifyToken = require("../Middlewares/authMiddleware");

router.get("/login/failed", (req, res) => {
  res.status(401).json({ message: "Login Failed" });
});

router.get("/login/success", async (req, res) => {
  try {
    if (req.user) {
      // let user = await User.findById(req.user.userId);

      res.status(200).json({
        message: "Successfully Logged In",
        user: req.user,
        token: req.token,
      });
    } else {
      res.status(403).json({ message: "Not Authorized" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
    session: false,
  }),

  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}?userId=${req.user.user._id}`);
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

// Export the router for use in other modules
module.exports = router;
