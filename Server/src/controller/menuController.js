
const router = require('express').Router();
const multer = require('multer');
const menuSchema = require('../models/MenuSchema');
const { upload } = require('../models/Uploads');

const getMenu = async (req, res, next) => {
    const menu = await menuSchema.find();
    return res.status(200).json(menu);
}

const menuController = async (req, res, next) => {
    console.log("Called to menuController");

    // console.log(req.body.title);
  

    const { title, content, price } = req.body;
    const image = req.file;

    if(!title || !content || !price || !image) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }
    console.log(req.file);

    const foundTitle = await menuSchema.findOne({ title });

    if(!foundTitle) {
        const createMenu = new menuSchema({
            title: req.body.title,
            content: req.body.content,
            price: req.body.price,
            image: req.file.filename,
        });
    
        try {
            const saveMenu = await createMenu.save();
            return res.status(200).json(saveMenu);
            
        }catch(err) {
            return res.status(500).json({
                message: "Error while creating menu",
                error: err
            })
        };
    } else {
        return res.status(400).json({
            message: "Title already exists"
        });
    }
}

const deleteMenu = async (req, res, next) => {
    const { id } = req.params;
    const menu = await menuSchema.findById(id);
    if(!menu) {
        return res.status(404).json({
            message: "Menu not found"
        });
    }
    try {
        const deleteMenu = await menuSchema.findByIdAndDelete(id);
        return res.status(200).json(deleteMenu);
    }
    
    catch(err) {
        return res.status(500).json({
            message: "Error while deleting menu",
            error: err
        })
    }
}

const updateMenu = async (req, res, next) => {
    const { id } = req.params;
    const menu = await menuSchema.findById(id);
    if(!menu) {
        return res.status(404).json({
            message: "Menu not found"
        });
    }
    try {
        if(menu.status){
            const updateMenu = await menuSchema.findByIdAndUpdate(id, { status: false });
            return res.status(200).json(updateMenu);
        } else {
            const updateMenu = await menuSchema.findByIdAndUpdate(id, { status: true });
            return res.status(200).json(updateMenu);
        }
    }catch(err) {
        return res.status(500).json({
            message: "Error while updating menu",
            error: err
        })
    }
}


module.exports = { menuController, getMenu, deleteMenu, updateMenu };
