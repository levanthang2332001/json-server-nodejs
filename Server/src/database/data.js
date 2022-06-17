const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const URL = process.env.MONGODB_URL_KEY_API;

async function connect() {
  try {
    await mongoose
      .connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected database from mongodb");
      });
  } catch (error) {
    console.log("Connect Failed");
  }
}
module.exports = { connect };
