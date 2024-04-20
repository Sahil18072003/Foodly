const express = require("express");
const router = express.Router();
const authController = require("../Controllers/auth-contoller");
const verifyToken = require("../Middlewares/authMiddleware");

router.route("/").get(authController.home);
router.route("/home").get(authController.home);

// User
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/otpVerification").post(authController.otpVerification);
router.route("/changePassword").post(authController.changePassword);
router.route("/contactUs").post(authController.userContant);
router.route("/dashboard").post(authController.dashboard);
router
  .route("/dashboard/updateProfile/:id")
  .put(verifyToken, authController.updateUserProfile);

router.route("/getUserDetail").post(authController.getUserDetail);

// Comments
router.route("/comment").post(verifyToken, authController.saveComment);
router.route("/showComment").get(verifyToken, authController.showComment);
router
  .route("/commentDelete/:id")
  .delete(verifyToken, authController.deleteOneComment);

router.route("/add-to-cart").post(verifyToken, authController.addToCart);

router
  .route("/get-user-data-list")
  .get(verifyToken, authController.getUserDataList);

module.exports = router;
