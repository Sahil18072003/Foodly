const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    resname: {
      type: String,
      require: true,
    },
    resadd: {
      type: String,
      require: true,
    },
    rescontact: {
      type: Number,
      require: true,
    },
    reslandline: {
      type: Number,
      require: true,
    },
    ownercontact: {
      type: Number,
      require: true,
    },
    ownername: {
      type: String,
      require: true,
    },
    owneremail: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Restaurant = new mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
