const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

const defaultJwtSecret = process.env.DEFAULT_JWT_SECRET;

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.decode(token, { complete: true });
        const userId = decoded.payload.id;

        const [rows] = await pool.query('SELECT jwtSecret FROM users WHERE id = ?', [userId]);
        const user = rows[0];

        if (!user) return res.status(403).json({ message: 'User not found' });

        jwt.verify(token, user.jwtSecret || defaultJwtSecret, (err, user) => {
            if (err) return res.status(403).json({ message: 'Invalid token' });
            req.user = user;
            next();
        });
    } catch (err) {
        console.error('Token verification error:', err); 
        res.status(500).json({ message: 'Token verification error' });
    }
};

module.exports = authenticateToken;
