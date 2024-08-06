const express = require('express');
const router = express.Router();
const { getAllNotifications, getNotificationById, createNotification, updateNotification, deleteNotification } = require('../controllers/notificationController');
const verifySession = require('../middleware/verifySession');



router.get('/',verifySession,  getAllNotifications);
router.get('/:id', verifySession, getNotificationById);
router.post('/', verifySession,  createNotification);
router.put('/:id', verifySession,  updateNotification);
router.delete('/:id', verifySession,  deleteNotification);

module.exports = router;
