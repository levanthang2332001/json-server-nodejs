const mongoose = require("mongoose");

const BookTable = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
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
  type: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
  status: {
    type: Boolean,
    default: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  }
});
module.exports = mongoose.model("BookTable", BookTable);


