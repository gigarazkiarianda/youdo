const express = require('express');
const { getAllNotifications, getNotificationById, createNotification, updateNotification, deleteNotification } = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getAllNotifications);
router.get('/:id', authMiddleware, getNotificationById);
router.post('/', authMiddleware, createNotification);
router.put('/:id', authMiddleware, updateNotification);
router.delete('/:id', authMiddleware, deleteNotification);

module.exports = router;
