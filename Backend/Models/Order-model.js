/** @format */

// userModel.js

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// ... define schema ...
const orderSchema = new Schema({
  address: {
    city: String,
    country: String,
    fullAddress: String,
    lendMarck: String,
    phone: Number,
    state: String,
    zipcode: Number,
  },
  date: String,
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  orderId: String,
  orderStatus: String,

  paymentId: String,
  paymentStatus: String,
  Products: [],
  totalPrice: String,
  uid: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const order = mongoose.model("order", orderSchema);

module.exports = order;
