const pool = require('../config/database');


exports.getAllNotifications = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM notifications');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving notifications' });
  }
};


exports.getNotificationById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM notifications WHERE id = ?', [req.params.id]);
    if (rows.length) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving notification' });
  }
};


exports.createNotification = async (req, res) => {
  try {
    const { message } = req.body;
    const [result] = await pool.query('INSERT INTO notifications (message) VALUES (?)', [message]);
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification' });
  }
};


exports.updateNotification = async (req, res) => {
  try {
    const { message } = req.body;
    const [result] = await pool.query('UPDATE notifications SET message = ? WHERE id = ?', [message, req.params.id]);
    if (result.affectedRows) {
      res.json({ message: 'Notification updated' });
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification' });
  }
};


exports.deleteNotification = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM notifications WHERE id = ?', [req.params.id]);
    if (result.affectedRows) {
      res.json({ message: 'Notification deleted' });
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting notification' });
  }
};
