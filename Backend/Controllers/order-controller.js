/** @format */

const Order = require("../Models/Order-model");
const APIFeatures = require("./apiFeatures");
// const catchAsync = require("./../utils/catchAsync");
// const AppError = require("./../utils/appError");

const getAllOrders = async (req, res, next) => {
  const addtoValue = req.query.addto;

  const features = new APIFeatures(Order.find(), req.query)
    .filter(addtoValue)
    .sort()
    .limitFields()
    .paginate();
  const orders = await features.query;

  await res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
};

const createOrder = async (req, res, next) => {
  const newOrder = await Order.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      newOrder: newOrder,
    },
  });
};

const getOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError("No order found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
};

const updateOrder = async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!order) {
    return next(new AppError("No order found with that ID", 404));
  }

  console.log(order, "update success");
  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
};

const deleteOrder = async (req, res, next) => {
  await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new AppError("No order found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
