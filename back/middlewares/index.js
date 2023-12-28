const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.isAuth = (req, res, next) => {
    // Get token from headers
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Add user to request object
        req.user = decodedToken.user; 
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token', details: error.message });
    }
};
exports.isAdmin = (req, res, next) => {
    // Get token from headers
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Add user to request object
        req.user = decodedToken.user;
        if (req.user.role === "admin") {
            next();
        } else {
            return res.status(401).json({ message: 'Vous n\'avez pas les droits pour effectuer cette action' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token', details: error.message });
    }
};
// module.exports = isAuth;