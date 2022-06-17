const express = require("express");
const googleController = require("../controller/googleController");

const router = express.Router();
router
    .route("/google")
    .post(googleController);

module.exports = router;
