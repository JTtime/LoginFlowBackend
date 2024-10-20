// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = req.cookies.auth_token ?? (authHeader && authHeader.split(' ')[1]) // Get the token part after "Bearer"

    

    console.log('Token:', req.cookies, authHeader, token);
     

    console.log('Token: final', token);


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden', error: err });
        }
        req.user = user; // Attach user info to the request object
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = auth;
