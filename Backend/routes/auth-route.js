const express = require("express");
const router = express.Router();
const authController = require("../Controllers/auth-contoller");
const verifyToken = require("./../Middlewares/authMiddleware");

router.route("/").get(authController.home);
router.route("/home").get(authController.home);
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
// router.route("/google/callback").get(verifyToken);
router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/otpVerification").post(authController.otpVerification);
router.route("/changePassword").post(authController.changePassword);
router.route("/contactUs").post(authController.userContant);

// Routes protected by verifyToken middleware
router.route("/adminPage").get(authController.getUserContact);
router.route("/adminPage").post(authController.getUserDetails);
router.route("/adminPage/:id").delete(authController.deleteUser);
router.route("/dashboard").post(verifyToken, authController.dashboard);
router
  .route("/dashboard/updateProfile/:id")
  .put(verifyToken, authController.updateUserProfile);

module.exports = router;
