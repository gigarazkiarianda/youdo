const pool = require('../config/db');

// Mendapatkan semua pengguna
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

// Mendapatkan pengguna berdasarkan ID
exports.getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (rows.length) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user' });
  }
};

// Memperbarui informasi pengguna
exports.updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const { username } = req.body;
    const [result] = await pool.query('UPDATE users SET username = ? WHERE id = ?', [username, userId]);
    if (result.affectedRows) {
      res.json({ message: 'User Updated' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Menghapus pengguna
exports.deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [userId]);
    if (result.affectedRows) {
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};
