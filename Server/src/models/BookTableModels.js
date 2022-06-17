const mongoose = require("mongoose");

const BookTable = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  }
});
module.exports = mongoose.model("BookTable", BookTable);


