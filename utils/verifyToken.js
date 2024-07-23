const jwt = require('jsonwebtoken');
const { jwtsecret } = require('../config/jwt');

const verifyToken = (token) => {
    return jwt.verify(token, jwtsecret);
};

module.exports = verifyToken;