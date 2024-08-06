const jwt = require('jsonwebtoken');

// Verifikasi token JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Akses token tidak ditemukan.' });
  }

  // Ambil secret key dari environment variables
  const secretKey = process.env.DEFAULT_SECRET_KEY;
  if (!secretKey) {
    console.error('Secret key tidak ditemukan dalam environment variables.');
    return res.status(500).json({ message: 'Konfigurasi server tidak benar.' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.error("JWT verification error: ", err);
      return res.status(403).json({ message: 'Token tidak valid.' });
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
