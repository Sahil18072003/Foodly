/** @format */

const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const razorpayOder = async (req, res, next) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const options = req.body;
  console.log(options);
  const order = await razorpay.orders.create(options);

  if (!order) {
    return res.status(500).send("Error");
  }

  res.json(order);
};

const razorpayOderValidate = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
};

module.exports = {
  razorpayOder,
  razorpayOderValidate,
};
