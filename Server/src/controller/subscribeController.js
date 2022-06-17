
const subscribe = require("../models/Subscribe");

const getSubscribes = async (req, res, next) => {
    console.log("Called to getSubscribes");

    try {
        const subscribes = await subscribe.find();
        return res.status(200).json(subscribes);
    } catch(err) {
        return res.status(500).json({
            message: "Error while getting subscribes",
            error: err
        })
    }
}

const deleteSubscribe = async (req, res, next) => {
    console.log("Called to deleteSubscribe");
    const { id } = req.params;

    console.log(id);
}

const subscribeController = async (req, res, next) => {
    console.log("Called to subscribeController");
    const { emailSubscription } = req.body;

    if(!emailSubscription) {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    const foundEmailSubscription = await subscribe.findOne({ emailSubscription });

    if(!foundEmailSubscription) {
        const newSubscribe = new subscribe({
            emailSubscription: req.body.emailSubscription,
        });
    
        try {
            const saveSubscribe = await newSubscribe.save();
            console.log(saveSubscribe);
            return res.status(200).json(saveSubscribe);
        } catch(err) {
            return res.status(500).json({
                message: "Error while subscribing",
                error: err
            })
        }

    } else {
        return res.status(200).json({
            message: "Email already exists"
        });
    }

}

module.exports = { getSubscribes, subscribeController, deleteSubscribe };
