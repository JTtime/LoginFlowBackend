// controllers/dataController.js
const Data = require('../models/Data');

const getData = async (req, res) => {
    const { startDate, endDate, age, gender } = req.query;

    const filters = {};
    
    if (startDate && endDate) {
        filters.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (age) {
        filters.age = age;
    }
    if (gender) {
        filters.gender = gender;
    }

    try {
        const data = await Data.find(filters);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

module.exports = { getData };
