const express = require("express");
const router = express.Router();
const foodController = require("../Controllers/food-contoller");
const verifyToken = require("../Middlewares/authMiddleware");

router.route("/addFood").post(verifyToken, foodController.addFood);

module.exports = router;
