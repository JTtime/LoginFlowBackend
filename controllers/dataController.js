// controllers/dataController.js
const Data = require('../models/Data');

const getData = async (req, res) => {
    const { startDate, endDate, age, gender } = req.query;

    const filters = {};

    if (startDate && endDate) {
        // Convert the startDate and endDate from milliseconds to Date objects
        const start = new Date(parseInt(startDate, 10));
        const end = new Date(parseInt(endDate, 10));
        
        // Format the dates to match the stored format "DD/MM/YYYY"
        const formattedStart = `${start.getDate() < 10 ? '0' : ''}${start.getDate()}/${
            start.getMonth() + 1 < 10 ? '0' : ''
        }${start.getMonth() + 1}/${start.getFullYear()}`;
        const formattedEnd = `${end.getDate() < 10 ? '0' : ''}${end.getDate()}/${
            end.getMonth() + 1 < 10 ? '0' : ''
        }${end.getMonth() + 1}/${end.getFullYear()}`;

        // Use formatted strings for filtering
        filters.Day = {
            $gte: formattedStart,
            $lte: formattedEnd,
        };
    }
    if (age) {
        filters.Age = age;
    }
    if (gender) {
        filters.Gender = gender;
    }

    try {
        const data = await Data.find(filters);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

module.exports = { getData };
