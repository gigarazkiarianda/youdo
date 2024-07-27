const jwt = require('jsonwebtoken');
require('dotenv').config();

const defaultJwtSecret = process.env.DEFAULT_JWT_SECRET;

const signToken = (payload) => {
    return jwt.sign(payload, defaultJwtSecret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, defaultJwtSecret, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        });
    });
};

module.exports = { signToken, verifyToken };
