/** @format */

const express = require("express");
const razorpayControll = require("../Controllers/razorpay-controller");

const router = express.Router();

router.route("/").post(razorpayControll.razorpayOder);

router.route("/validate").post(razorpayControll.razorpayOderValidate);

module.exports = router;
