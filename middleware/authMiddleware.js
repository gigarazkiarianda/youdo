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
        // Decode and verify the token
        const decoded = await verifyToken(token);
        console.log('Decoded token:', decoded);

        const userId = decoded.id;
        console.log('Extracted userId from token:', userId);

        // Fetch the user from the database to get the JWT secret if needed
        const [rows] = await pool.query('SELECT jwtSecret FROM users WHERE id = ?', [userId]);
        console.log('Database user secret:', rows);

        const user = rows[0];

        if (!user) {
            return res.status(403).json({ message: 'User not found' });
        }

        // Verify the token again with the user's secret if available
        await verifyToken(token, user.jwtSecret || process.env.DEFAULT_JWT_SECRET);
        
        // Attach userId to request object for use in controllers
        req.userId = userId;
        req.user = decoded;  // Optionally attach the whole user object if needed
        next();
        
    } catch (err) {
        console.error('Token verification error:', err);
        
        // Differentiate between token format and general verification errors
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token format' });
        }
        
        res.status(500).json({ message: 'Token verification error' });
    }
};

module.exports = authenticateToken;
