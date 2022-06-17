const account = require('../models/AccountAdmin');

const accountAdminController = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    if(!email || !password) {
        return res.status(400).json({
            message: 'Please fill all fields'
        });
    }
    try {
        const accountAdmin = await account.findOne({ email: req.body.email });
        if(!accountAdmin) {
            return res.status(404).json({
                message: 'Account not found'
            });
        }
        if(accountAdmin.password !== req.body.password) {
            return res.status(401).json({
                message: 'Incorrect password'
            });
        } else {
            return res.status(200).json({
                message: 'Account admin logged in successfully'
            });
        }
    }catch (error) {
        return res.status(500).json({
            message: 'Error creating Account'
        });
    }
}

const createAccount = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({
            message: 'Please fill all fields'
        });
    }
    try {
        const newAccount = new account({
            email: req.body.email,
            password: req.body.password
        });
        await newAccount.save();
        return res.status(201).json({
            message: 'Account created successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating Account'
        });
    }
}

module.exports = { accountAdminController, createAccount };
