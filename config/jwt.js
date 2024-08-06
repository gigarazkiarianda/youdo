const jwt = require('jsonwebtoken');

// Secret default untuk semua pengguna
const DEFAULT_JWT_SECRET = process.env.DEFAULT_JWT_SECRET;

// Fungsi untuk membuat token JWT
const createToken = (userId) => {
  return jwt.sign({ id: userId }, DEFAULT_JWT_SECRET, { expiresIn: '1h' });
};

// Fungsi untuk memverifikasi token JWT
const verifyToken = (token) => {
  return jwt.verify(token, DEFAULT_JWT_SECRET);
};

module.exports = { createToken, verifyToken };
