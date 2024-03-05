const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      require: true,
    },
    restaurantAddress: {
      type: String,
      require: true,
    },
    restaurantContact: {
      type: Number,
      require: true,
    },
    landline: {
      type: String,
    },
    ownerContact: {
      type: String,
      // require: true,
    },
    ownerName: {
      type: String,
    },
    ownerEmail: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("User", userSchema);

module.exports = User;
