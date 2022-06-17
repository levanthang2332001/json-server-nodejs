const express = require("express");
const { model } = require("mongoose");
const {menuController, getMenu, deleteMenu, updateMenu} = require("../controller/menuController");
const { commentController, getComments} = require("../controller/commentController");
const { upload } = require("../models/Uploads");
const router = express.Router();

router
    .route("/posts")
    .post(upload, menuController);

router
    .route("/gets")
    .get(getMenu);

router
    .route("/comments")
    .post(commentController);

router
    .route("/getcomments")
    .get(getComments);

router
    .route("/delete/:id")
    .delete(deleteMenu)

router
    .route("/update/:id")
    .put(updateMenu)
module.exports = router;
