const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/admin-contoller");
const verifyToken = require("../Middlewares/authMiddleware");

// Post User data
router.route("/adminPage").post(verifyToken, adminController.getUserDetails);

// User delete with commnets and restaurants
router.route("/adminPage/:id").delete(verifyToken, adminController.deleteUser);
router
  .route("/deleteAllComments/:id")
  .delete(verifyToken, adminController.deleteAllComments);
router
  .route("/deleteAllRestaurants/:id")
  .delete(verifyToken, adminController.deleteAllRestaurants);

// Get Restaurant details
router
  .route("/getAllRestaurantDetails")
  .get(verifyToken, adminController.getAllRestaurantDetails);

// Delete One Restaurant
router
  .route("/deleteRestaurant/:id")
  .delete(verifyToken, adminController.deleteRestaurant);

router.route("/adminPage").get(verifyToken, adminController.getUserContact);

// verfication Apis
router
  .route("/createResPage/:id")
  .post(verifyToken, adminController.createResPage);
router
  .route("/documentVerification/:id")
  .post(verifyToken, adminController.documentVerification);
router
  .route("/deliveryActivation/:id")
  .post(verifyToken, adminController.deliveryActivation);
router
  .route("/menuDigitisation/:id")
  .post(verifyToken, adminController.menuDigitisation);
router
  .route("/bankDetailsVerification/:id")
  .post(verifyToken, adminController.bankDetailsVerification);

module.exports = router;
