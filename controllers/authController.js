const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { jwtSecret: defaultJwtSecret } = require('../config/jwt');

// Generate a unique JWT secret
const generateJwtSecret = () => crypto.randomBytes(64).toString('hex');

exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const jwtSecret = generateJwtSecret();

        const [result] = await pool.query(
            'INSERT INTO users (username, email, passwordHash, jwtSecret) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, jwtSecret]
        );

        res.status(201).json({ id: result.insertId });
    } catch (error) {
        console.error('Registration error:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error registering user' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = rows[0];

        if (user && await bcrypt.compare(password, user.passwordHash)) {
            const token = jwt.sign({ id: user.id }, user.jwtSecret || defaultJwtSecret, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error logging in' });
    }
};
