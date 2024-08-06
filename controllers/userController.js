// controllers/userController.js
const pool = require('../config/database');

// Mendapatkan semua pengguna (Hanya untuk admin atau pengguna yang memiliki izin khusus)
exports.getAllUsers = async (req, res) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
};

// Mendapatkan pengguna berdasarkan ID (Diperbolehkan untuk pengguna yang sama atau admin)
exports.getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    // Pastikan hanya pengguna yang sama atau admin yang bisa mengakses data pengguna
    if (req.session.userId !== userId && !req.session.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (rows.length) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
};

// Memperbarui informasi pengguna (Diperbolehkan untuk pengguna yang sama atau admin)
exports.updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const { username } = req.body;

    // Pastikan hanya pengguna yang sama atau admin yang bisa memperbarui data pengguna
    if (req.session.userId !== userId && !req.session.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const [result] = await pool.query('UPDATE users SET username = ? WHERE id = ?', [username, userId]);
    if (result.affectedRows) {
      res.json({ message: 'User updated' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Menghapus pengguna (Hanya untuk admin)
exports.deleteUser = async (req, res) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const userId = parseInt(req.params.id, 10);
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [userId]);
    if (result.affectedRows) {
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};
