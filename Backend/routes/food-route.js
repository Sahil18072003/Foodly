const express = require("express");
const router = express.Router();
const foodController = require("../Controllers/food-contoller");
const verifyToken = require("../Middlewares/authMiddleware");

router.route("/addFood").post(verifyToken, foodController.addFood);

router
  .route("/getFoodDetails/:id")
  .post(verifyToken, foodController.getFoodDetails);

router.route("/getOneFoodDetails/:id").post(foodController.getOneFoodDetails);

module.exports = router;
