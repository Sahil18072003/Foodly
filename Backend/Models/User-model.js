const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
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
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  profileImage: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
