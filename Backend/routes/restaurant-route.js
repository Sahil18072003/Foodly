const express = require("express");
const router = express.Router();
const restaurantController = require("../Controllers/restaurant-contoller");

router
  .route("/addRestaurant/addFrom/1")
  .post(restaurantController.addRestaurant1);
router
  .route("/addRestaurant/addFrom/1/:id")
  .put(restaurantController.updateRestaurant);
router
  .route("/addRestaurant/addFrom/sendOtp")
  .post(restaurantController.sendOtp);
router
  .route("/addRestaurant/addFrom/checkOtp")
  .post(restaurantController.checkOtp);
router
  .route("/addRestaurant/addFrom/2/:id")
  .post(restaurantController.addRestaurant2);
router
  .route("/addRestaurant/addFrom/3/:id")
  .post(restaurantController.addRestaurant3);
// router.route("/findRestaurant").post(restaurantController.findRestaurant);

module.exports = router;
