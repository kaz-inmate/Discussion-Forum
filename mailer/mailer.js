const nodemailer = require('nodemailer');
const config = require('../config/mailauth');

const transport = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
        user: config.mailgun_user,
        pass: config.mailgun_pass
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transport;