require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'key-secret';

module.exports = {
    jwtSecret,
};