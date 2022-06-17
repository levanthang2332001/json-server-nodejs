const express = require("express");
const {bookTableController, getBookTableController, cancelBookTableController, editBookTableController} = require("../controller/bookTableController");

const router = express.Router();

router
    .route('/book-table')
    .post(bookTableController);

router
    .route('/get-book-table')
    .get(getBookTableController);
router 
    .route('/cancel-booking/:id')
    .get(cancelBookTableController);

router
    .route('/edit-booking/:id')
    .get(editBookTableController);

module.exports = router;
