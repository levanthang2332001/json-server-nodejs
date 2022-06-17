const mongoose = require("mongoose");

const Account = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  sub: {
    type: String,
    required: true,
  },
  authType: {
    type: String,
    enum: ["google"],
    default: "google",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  }

});
module.exports = mongoose.model("Account", Account);


