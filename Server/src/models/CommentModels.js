const mongoose = require("mongoose");

const Assessment = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  userid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  menuid: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  bestSeller: {
    type: Boolean,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  }
});
module.exports = mongoose.model("Assessment", Assessment);


