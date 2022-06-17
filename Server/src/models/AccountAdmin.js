const mongoose = require("mongoose");

const AccountAdmin = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  }

});
module.exports = mongoose.model("AccountAdmin", AccountAdmin);


