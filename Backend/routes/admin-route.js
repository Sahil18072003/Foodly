const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/admin-contoller");
const verifyToken = require("../Middlewares/authMiddleware");

// Routes protected by verifyToken middleware
router.route("/adminPage").post(verifyToken, adminController.getUserDetails);
router.route("/adminPage/:id").delete(verifyToken, adminController.deleteUser);
router
  .route("/deleteAllComments/:id")
  .delete(verifyToken, adminController.deleteAllComments);
router.route("/adminPage").get(verifyToken, adminController.getUserContact);
router
  .route("/deleteRestaurant/:id")
  .delete(verifyToken, adminController.deleteRestaurant);
router
  .route("/getAllRestaurantDetails")
  .get(verifyToken, adminController.getAllRestaurantDetails);

module.exports = router;
