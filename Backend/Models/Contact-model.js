const mongoose = require("mongoose");

const userConatctSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  message: {
    type: String,
  },
});

const UserContact = new mongoose.model("Contact", userConatctSchema);

module.exports = UserContact;
