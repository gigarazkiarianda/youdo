const nodemailer = require('nodemailer');
const { emailConfig } = require('../config/email');


const transporter = nodemailer.createTransport(emailConfig);


const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: '"Your App" <your-email@example.com>',
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
