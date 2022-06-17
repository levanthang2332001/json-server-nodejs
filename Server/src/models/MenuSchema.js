const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Menu", MenuSchema);


