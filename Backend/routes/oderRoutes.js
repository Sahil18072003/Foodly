/** @format */

const express = require("express");

const orderControll = require("./../Controllers/orderControll");

const router = express.Router();

router
  .route("/")
  .get(orderControll.getAllOrders)
  .post(orderControll.createOrder);

router
  .route("/:id")
  .put(orderControll.updateOrder)
  .get(orderControll.getOrder)
  .delete(orderControll.deleteOrder);

module.exports = router;
