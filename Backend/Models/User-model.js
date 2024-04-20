const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    password: {
      type: String,
      // require: true,
    },
    address: [
      {
        city: String,
        country: String,
        fullAddress: String,
        lendMarck: String,
        phone: Number,
        state: String,
        zipcode: Number,
      },
    ],
    profileImage: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: [
      {
        foodId: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("User", userSchema);

module.exports = User;
