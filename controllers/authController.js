const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'User registration failed' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const cookieExpiry = parseInt(process.env.COOKIE_EXPIRY) * 1000; // Convert seconds to milliseconds

    res.cookie('auth_token', token, {
        httpOnly: true,
        maxAge: cookieExpiry,
        // domain: 'http://localhost:3000/',
        secure: true,
        sameSite: 'None', // Adjust based on your requirements
    });
    

    res.json({ message: 'Logged in successfully', auth_token: token });
};


const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};

module.exports = { register, login, logout };
