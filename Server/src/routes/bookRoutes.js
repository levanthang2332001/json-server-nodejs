const express = require("express");
const {bookTableController, getBookTableController, deleteBookTableController} = require("../controller/bookTableController");

const router = express.Router();

router
    .route('/book-table')
    .post(bookTableController);

router
    .route('/get-book-table')
    .get(getBookTableController);
router 
    .route('/delete-book-table/:id')
    .delete(deleteBookTableController);

module.exports = router;
