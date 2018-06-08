const nodemailer = require('nodemailer');
const templates = require('./emailTemplates')

module.exports = function() {
    let smtpConfig = {
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: '', // generated ethereal user
            pass: '' // generated ethereal password
        }
    }

    let emailService = nodemailer.createTransport(smtpConfig)

    let mailOptions = {
        from: 'Project TT', // sender address
        to: null, // list of receivers
        subject: null, // Subject line
        text: null, // plain text body
        html: null // html body
    };

    function passwordReset(toEmailAddress, uuid) {
        var body = templates.PasswordReset(uuid)

        mailOptions.to = toEmailAddress
        mailOptions.subject = 'Password Reset Request'
        mailOptions.html = body

        // send mail with defined transport object
        emailService.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    }

    function testEmailService() {
        emailService.verify(function(err, suc) {
            if (err) {
                console.log(err)
            } else {
                console.log('E-mail server is good to go.')
            }
        })
    }

    function sendTestEmail() {
        mailOptions.from = '', // sender address
        mailOptions.to = '', // list of receivers
        mailOptions.subject = 'Hello ✔', // Subject line
        mailOptions.text = 'Hello world?', // plain text body

        // send mail with defined transport object
        emailService.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    }

    return {
        passwordReset: passwordReset,
        testEmailService: testEmailService,
        sendTestEmail: sendTestEmail
    }
}