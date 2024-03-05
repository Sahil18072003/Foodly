const express = require("express");
const router = express.Router();
const restaurantController = require("../Controllers/restaurant-contoller");

router.route("/addRestaurant/addFrom").post(restaurantController.addRestaurant);
router.route("/findRestaurant").post(restaurantController.findRestaurant);

module.exports = router;
