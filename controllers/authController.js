const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtsecret } = require('../config/jwt');

exports.register = async (req, res)  => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ message : 'Error registering user' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const [rows] = await pool.query('SELECT FROM users WHERE username = ?', [username]);
        const user = rows[0];
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id }, jwtsecret, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'invalid credentials' }); 
        }
    } catch (error) {
        res.status(500),json({ message: 'Error logging in' });
    }
}