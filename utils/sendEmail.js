const sendEmail = require('../services/emailService');

const sendEmailWrapper = async(to, subject, text) => {
    try {
        await sendEmail(to, subject, text);
    } catch (error) {
        console.error('Failed to send email', error);
    }
};

module.exports = sendEmailWrapper;