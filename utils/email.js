const nodemailer = require('nodemailer');

const config = require('../config');

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    host: config.mailtrap.MAILTRAP_HOST,
    port: config.mailtrap.MAILTRAP_PORT,
    auth: {
      user: config.mailtrap.MAILTRAP_USERNAME,
      pass: config.mailtrap.MAILTRAP_PASSWORD
    }
  });

  const mailOptions = {
    from: 'Happy Hangeul <happy.hangeul@localhost',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
