const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const subscribe = require('../models/Subscribe');

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ACCOUNT_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
});


const sendGmail = async (req, res) => {
  console.log("Call to sendGmail");

  const { subject, text, email } = req.body;

  if(!subject || !text || !email) {
    res.status(400).json({
      message: "Missing required fields",
    });
  }

  console.log(req.body);

  const foundEmail = await subscribe.find();
  const listEmail = [];

  foundEmail.forEach((item) => {
    listEmail.push(item.emailSubscription);
  })

  
  const options = {
    from: "vanthang23032001@gmail.com",
    to: `${listEmail}`,
    subject: `${subject}`,
    text: `${text}`,
  };
  
  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
    }
    return res.status(200).json({
      message: "Email sent",
    });
  });
};

module.exports = sendGmail;
