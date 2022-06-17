const { OAuth2Client } = require('google-auth-library');
const dotenv = require('dotenv');
const path = require('path');
const Account = require('../models/AccountModels');
const { response } = require('express');

dotenv.config({
    path: path.resolve(__dirname,"../.env"),
});

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authGoogle = async (req, res) =>{
    console.log("Called authGoogle");

    const { email, name, picture, sub } = req.body;

    if(!email || !name || !picture || !sub) {
        return res.status(400).json({
            message: "Missing required fields"
        })
    }

    const foundEmail = await Account.findOne({ email });

    console.log(foundEmail);

    if(!foundEmail) {
        const createAccount = new Account({
            email: req.body.email,
            name: req.body.name,
            picture: req.body.picture,
            sub: req.body.sub,
        });

        try {
            const saveAccount = await createAccount.save();
            return res.status(200).json(saveAccount);
        } catch(err) {
            return res.status(500).json({
                message: "Error while creating account",
                error: err
            })
        }
    } else {
        return res.status(200).json({
            message: "Email already exists"
        });
    }
}

module.exports = authGoogle;
