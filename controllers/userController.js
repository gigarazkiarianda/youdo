const pool = require('../config/db');

exports.getAllUsers = async (req, res ) => {
    try {
        const [ rows ] = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
        if(rows.length) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'User not found '});
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user'});
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { username } = req.body;
        const [ result ] = await pool.query('UPDATE users SET username = ? WHERE id = ?', [username, req.params.id]);
        if(result.affectedRows) {
            res.json({ message: 'User Updated'});
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating user'});
    }
};

exports.deleteUser = async (req, res) =>  {
    try {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
        if (result.affectedRows) {
            res.json({ message: 'User deleted'});
        } else {
            res.status(404).json({ message: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user'});
    }
};