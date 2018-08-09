const nodemailer = require('nodemailer');
const templates = require('./emailTemplates')

module.exports = function(config) {
    // check config
    if (!config.username || !config.password) {
        console.error("Missing email service credentials.")
        console.log("Use --emailusername and --emailpassword to pass in credentials")
        console.log('Terminating application.')
        process.exit(0)
    }

    if (!config.testEmailAddress) {
        console.warn("Email address for testing not found. \n You will not be able to send test email.")
    }


    let smtpConfig = {
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: config.username,
            pass: config.password
        }
    }

    let emailService = nodemailer.createTransport(smtpConfig)

    let mailOptions = {
        from: 'TaskTrackr', // sender address
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
        if (!config.testEmailAddress) {
            console.log("Can't send email because test email address is missing.")
            console.log("Relaunch application with the --testemailaddress flag.")
            return;
        }
        mailOptions.from = 'TaskTrackr Test', // sender address
        mailOptions.to = config.testEmailAddress, // list of receivers
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