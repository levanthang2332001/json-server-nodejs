const bookTable = require('../models/BookTableModels');

const getBookTableController = async (req, res) => {
    const bookTables = await bookTable.find();
    return res.status(200).json({
        message: 'BookTable retrieved successfully',
        bookTables
    });
}

const bookTableController = async (req, res) => {
    console.log('Call to bookTableController');

    const { name, amount, time, day } = req.body;

    if (!name || !amount || !time || !day) {
        return res.status(400).json({
            message: 'Please fill all fields'
        });
    };

    const sliceDay = day.slice(0,10);

    try{
        const newBookTable = new bookTable({
            name: req.body.name,
            amount: req.body.amount,
            time: req.body.time,
            day: sliceDay
        });
        await newBookTable.save();
        return res.status(201).json({
            message: 'BookTable created successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating BookTable'
        });
    }

}

const deleteBookTableController = async (req, res) => {
    const { id } = req.params;
    try {
        await bookTable.findByIdAndDelete(id);
        return res.status(200).json({
            message: 'BookTable deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting BookTable'
        });
    }
}

module.exports = {bookTableController,getBookTableController, deleteBookTableController};
