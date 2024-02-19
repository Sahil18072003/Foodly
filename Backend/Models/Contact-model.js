const mongoose = require("mongoose");

const userConatctSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});

const UserContact = new mongoose.model("Contact", userConatctSchema);

module.exports = UserContact;
