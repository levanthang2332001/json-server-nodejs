const express = require("express");
const { accountAdminController, createAccount } = require("../controller/accountAdminController");
const router = express.Router();

router 
    .route("/account-admin")
    .post(accountAdminController);

router
    .route('/create-account')
    .post(createAccount);
module.exports = router;
