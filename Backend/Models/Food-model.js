const mongoose = require("mongoose");

const food = new mongoose.Schema(
  {
    foodname: {
      type: String,
      require: true,
    },
    foodcategory: {
      type: String,
      require: true,
    },
    foodtype: {
      type: String,
      require: true,
    },
    servicetype: {
      type: Number,
      require: true,
    },
    foodprice: {
      type: String,
      require: true,
    },
    fooddetails: {
      type: String,
      require: true,
    },
    foodimg: {
      type: Array,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Food = new mongoose.model("Food", food);

module.exports = Food;
