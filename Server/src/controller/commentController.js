const commentModels = require("../models/CommentModels");

const getComments = async (req, res, next) => {
    const comments = await commentModels.find();
    return res.status(200).json(comments);
};

const commentController = async (req, res, next) => {
    console.log("Called to commentController");

    console.log(req.body);
    const { userid, menuid, comment, name, avatar} = req.body;

    if (!userid || !menuid || !comment || !name || !avatar) {
    return res.status(400).json({
        message: "Missing required fields",
    });
    }

    const createComment = new commentModels({
        userid: req.body.userid,
        name: req.body.name,
        menuid: req.body.menuid,
        avatar: req.body.avatar,
        comment: req.body.comment,
        bestSeller: req.body.bestSeller,
    });

    try {
        const saveComment = await createComment.save();
        return res.status(200).json(saveComment);
    } catch (err) {
        return res.status(500).json({
        message: "Error while creating comment",
        error: err,
        });
    }
};

module.exports = { commentController, getComments };
