require('dotenv').config();

const jwtSecret = process.env.DEFAULT_JWT_SECRET;

module.exports = {
  jwtSecret,
};