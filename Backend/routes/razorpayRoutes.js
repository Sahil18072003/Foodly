/** @format */

const express = require("express");
const razorpayControll = require("./../Controllers/razorpayControll");

const router = express.Router();

router.route("/").post(razorpayControll.razorpayOder);

router.route("/validate").post(razorpayControll.razorpayOderValidate);

module.exports = router;
