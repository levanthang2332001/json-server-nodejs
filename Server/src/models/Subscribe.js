const mongoose = require("mongoose");

const subscribe = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  emailSubscription: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  }

});
module.exports = mongoose.model("subscribe", subscribe);


