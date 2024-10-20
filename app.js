const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Import the cors package
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes'); // Import data routes

const dotenv = require('dotenv');

dotenv.config();

const app = express();
connectDB();

app.use(cors({
    origin: ['https://data-visuals.netlify.app'], // Specify allowed origins
    methods: ['GET', 'POST'], // Specify allowed methods
    credentials: true, // Allow cookies to be sent
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes); // Add data routes


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
