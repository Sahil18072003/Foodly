const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    isVerified: {
      type: Boolean,
      default: false,
    },
    resname: {
      type: String,
      require: true,
    },
    resadd: {
      type: String,
      require: true,
    },
    respincode: {
      type: Number,
      require: true,
    },
    resstate: {
      type: String,
      require: true,
    },
    rescity: {
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
    ownerid: {
      type: String,
      require: true,
    },
    ownername: {
      type: String,
      require: true,
    },
    ownercontact: {
      type: Number,
      require: true,
    },
    owneremail: {
      type: String,
      require: true,
    },
    rescategory: {
      type: String,
      require: true,
    },
    restypes: {
      type: Array,
      require: true,
    },
    rescuisinetype: {
      type: Array,
      require: true,
    },
    openingtime: {
      type: String,
      require: true,
    },
    closingtime: {
      type: String,
      require: true,
    },
    resdays: {
      type: Array,
      require: true,
    },
    menuimg: {
      type: Array,
      require: true,
    },
    resimg: {
      type: Array,
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

const Restaurant = new mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
