// controllers/authController.js
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');

// Fungsi untuk registrasi pengguna
exports.register = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, email } = req.body;

    try {
      const [existingUser] = await pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);

      if (existingUser.length > 0) {
        return res.status(409).json({ message: 'Username or email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const [result] = await pool.query(
        'INSERT INTO users (username, email, passwordHash) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );

      res.status(201).json({ message: 'User registered successfully', id: result.insertId });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  }
];

// Fungsi untuk login pengguna
exports.login = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      const user = rows[0];

      if (user && await bcrypt.compare(password, user.passwordHash)) {
        req.session.userId = user.id; // Simpan userId dalam sesi

        res.json({
          message: 'Login successful',
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  }
];

// Fungsi untuk logout pengguna
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.clearCookie('session_cookie_name');
    res.json({ message: 'Logout successful' });
  });
};
