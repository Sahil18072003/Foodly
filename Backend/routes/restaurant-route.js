const express = require("express");
const router = express.Router();
const restaurantController = require("../Controllers/restaurant-contoller");

router.route("/addRestaurant/addFrom/1").post(restaurantController.addRestaurant1);
// router.route("/addRestaurant/addFrom/2").post(restaurantController.addRestaurant2);
// router.route("/addRestaurant/addFrom/3").post(restaurantController.addRestaurant3);
// router.route("/findRestaurant").post(restaurantController.findRestaurant);

module.exports = router;
