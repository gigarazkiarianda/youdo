const { pool } = require('../config/database'); // Pastikan path ini sesuai dengan konfigurasi database Anda

// Middleware untuk memverifikasi sesi pengguna
const authenticateSession = async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
      // Verifikasi sesi pengguna
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.session.userId]);
      if (rows.length) {
        req.user = rows[0]; // Lampirkan data pengguna ke objek request
        return next();
      } else {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      console.error('Session verification error:', error.message);
      return res.status(500).json({ message: 'Error verifying session' });
    }
  } else {
    return res.status(401).json({ message: 'No session found' });
  }
};

module.exports = authenticateSession;
