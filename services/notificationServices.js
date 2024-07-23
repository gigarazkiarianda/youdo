const { Notification } = require('../models');

const createNotification = async (message) => {
    return await Notification.create({ message });
};

const getNotification = async () => {
    return await Notification.findAll();
};

module.exports = { createNotification, getNotification};