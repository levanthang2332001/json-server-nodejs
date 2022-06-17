const bookTable = require('../models/BookTableModels');
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require('mongoose');
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

const sendGmail = (name, email,amount , sliceDay, time, id) => {
    console.log("Call to sendGmail");
  
    console.log(name, email, amount, sliceDay, time);
  
    const options = {
      from: "vanthang23032001@gmail.com",
      to: `${email}`,
      subject: `Booking Gericht restaurant`,
      text: `
        Hello ${name},
        Thanks you for booking a table at Gericht restaurant.
        Your booking is confirmed.
        You have booked a table for ${amount} people at ${sliceDay} at ${time}.
        We will contact you as soon as possible.
        Thank you.
      `,
      html: `<div>
        <h1>Hello ${name},</h1>
        <p>Thanks you for booking a table at Gericht restaurant.</p>
        <p>Your booking is confirmed.</p>
        <p>You have booked a table for <b>${amount}</b> people at <b>${sliceDay}</b> at <b>${time}</b>.</p>
        <p>We will contact you as soon as possible.</p>
        <p>Thank you.</p>
        <br />
        <p>If you want to cancel your booking, please click <a href="http://localhost:5000/api/cancel-booking/${id}">here</a></p>
      </div>`
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

const getBookTableController = async (req, res) => {
    const bookTables = await bookTable.find();
    return res.status(200).json({
        message: 'BookTable retrieved successfully',
        bookTables
    });
}

const bookTableController = async (req, res) => {
    console.log('Call to bookTableController');

    const { name, email, amount, time, day } = req.body;

    console.log(req.body);

    if (!name || !amount || !time || !day || !email) {
        return res.status(400).json({
            message: 'Please fill all fields'
        });
    };

    const sliceDay = day.slice(0,10);
    const id = new mongoose.Types.ObjectId();
    console.log(id);

    try{
        const newBookTable = new bookTable({
            _id: id,
            name: req.body.name,
            email: req.body.email,
            amount: req.body.amount,
            time: req.body.time,
            day: sliceDay
        });
        await newBookTable.save();
        await sendGmail(name, email, amount, sliceDay, time, id);
        return res.status(201).json({
            message: 'BookTable created successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating BookTable'
        });
    }

}

const cancelBookTableController = async (req, res) => {
    const { id } = req.params;
    try {
        await bookTable.findByIdAndUpdate(id, { type: "Cancelled" });
        return res.status(200).json({
            message: 'BookTable cancelled successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error canceling BookTable'
        });
    }
}

const editBookTableController = async (req, res) => {
    const { id } = req.params;
    try {
        await bookTable.findByIdAndUpdate(id, { type: "Confirmed" });
        return res.status(200).json({
            message: 'BookTable edited successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error editing BookTable'
        });
    }
}

module.exports = {bookTableController,getBookTableController, cancelBookTableController, editBookTableController};
