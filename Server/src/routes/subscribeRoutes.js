const express = require("express");
const { subscribeController, getSubscribes, deleteSubscribe }  = require("../controller/subscribeController");
const sendGmail = require("../controller/sendEmailController");

const router = express.Router();

router
    .route('/newsletter/send')
    .post(subscribeController);

router 
    .route('/newsletter/get')
    .get(getSubscribes);

router 
    .route('/sendEmail')
    .post(sendGmail);

router
    .route('/delete/:id')
    .delete(deleteSubscribe)
module.exports = router;
