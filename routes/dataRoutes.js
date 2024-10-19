// routes/dataRoutes.js
const express = require('express');
const { getData } = require('../controllers/dataController');
const auth = require('../middleware/auth'); // Make sure you have this middleware for authentication

const router = express.Router();

router.get('/', auth, getData);

module.exports = router;
