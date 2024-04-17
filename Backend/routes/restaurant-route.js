const express = require("express");
const router = express.Router();
const restaurantController = require("../Controllers/restaurant-contoller");
const verifyToken = require("../Middlewares/authMiddleware");

router
  .route("/addRestaurant/addFrom/1")
  .post(verifyToken, restaurantController.addRestaurant1);
router
  .route("/addRestaurant/addFrom/1/:id")
  .put(verifyToken, restaurantController.updateRestaurant);
router
  .route("/addRestaurant/addFrom/sendOtp")
  .post(verifyToken, restaurantController.sendOtp);
router
  .route("/addRestaurant/addFrom/checkOtp")
  .post(verifyToken, restaurantController.checkOtp);
router
  .route("/addRestaurant/addFrom/2/:id")
  .post(verifyToken, restaurantController.addRestaurant2);
router
  .route("/addRestaurant/addFrom/3/:id")
  .post(verifyToken, restaurantController.addRestaurant3);
router
  .route("/addRestaurant/addFrom/4/:id")
  .post(verifyToken, restaurantController.addRestaurant4);
router
  .route("/addRestaurant/addFrom/5/:id")
  .post(verifyToken, restaurantController.addRestaurant5);
router
  .route("/addRestaurant/addFrom/6/:id")
  .post(verifyToken, restaurantController.addRestaurant6);
router
  .route("/addRestaurant/addFrom/7/:id")
  .post(verifyToken, restaurantController.addRestaurant7);
router
  .route("/getOwnerRestaurnts/:id")
  .post(verifyToken, restaurantController.getRestaurants);
router
  .route("/getRestaurantDetails/:id")
  .post(verifyToken, restaurantController.getRestaurantDetails);

module.exports = router;
