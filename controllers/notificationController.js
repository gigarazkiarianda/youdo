const pool = require('../config/database');


exports.getAllNotifications = async (req, res) => {
  
  if (!req.session.userId || !req.session.isAdmin) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM notifications');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving notifications', error: error.message });
  }
};


exports.getNotificationById = async (req, res) => {
  
  if (!req.session.userId && !req.session.isAdmin) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM notifications WHERE id = ?', [req.params.id]);
    if (rows.length) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving notification', error: error.message });
  }
};


exports.createNotification = async (req, res) => {
  
  if (!req.session.userId || !req.session.isAdmin) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const { message } = req.body;
    const [result] = await pool.query('INSERT INTO notifications (message) VALUES (?)', [message]);
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification', error: error.message });
  }
};

// Memperbarui notifikasi (Hanya untuk admin atau pengguna yang memiliki izin khusus)
exports.updateNotification = async (req, res) => {
  // Memeriksa apakah pengguna sudah login dan apakah pengguna memiliki izin yang tepat
  if (!req.session.userId || !req.session.isAdmin) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const { message } = req.body;
    const [result] = await pool.query('UPDATE notifications SET message = ? WHERE id = ?', [message, req.params.id]);
    if (result.affectedRows) {
      res.json({ message: 'Notification updated' });
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification', error: error.message });
  }
};

// Menghapus notifikasi (Hanya untuk admin atau pengguna yang memiliki izin khusus)
exports.deleteNotification = async (req, res) => {
  // Memeriksa apakah pengguna sudah login dan apakah pengguna memiliki izin yang tepat
  if (!req.session.userId || !req.session.isAdmin) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const [result] = await pool.query('DELETE FROM notifications WHERE id = ?', [req.params.id]);
    if (result.affectedRows) {
      res.json({ message: 'Notification deleted' });
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting notification', error: error.message });
  }
};
