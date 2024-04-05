const mongoose = require("mongoose");

const userComment = new mongoose.Schema({
  uid: { type: String },
  comment: { type: String },
});

const Comment = new mongoose.model("Comment", userComment);

module.exports = Comment;
