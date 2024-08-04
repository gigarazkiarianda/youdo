const pool = require('../config/db');
const { verifyToken } = require('../config/jwt'); 

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Received token:', token);

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Decode and verify token
        const decoded = await verifyToken(token);
        console.log('Decoded token:', decoded);

        const userId = decoded.id;

        // Fetch user from database
        const [rows] = await pool.query('SELECT jwtSecret FROM users WHERE id = ?', [userId]);
        console.log('Database user secret:', rows);

        const user = rows[0];

        if (!user) {
            return res.status(403).json({ message: 'User not found' });
        }

        
        try {
            await verifyToken(token, user.jwtSecret || process.env.DEFAULT_JWT_SECRET);
            req.user = decoded; 
            next();
        } catch (err) {
            console.error('Verification error:', err);
            return res.status(403).json({ message: 'Invalid token' });
        }
    } catch (err) {
        console.error('Token verification error:', err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token format' });
        }
        res.status(500).json({ message: 'Token verification error' });
    }
};

module.exports = authenticateToken;
