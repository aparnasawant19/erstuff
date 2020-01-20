const nodemailer = require('nodemailer')
function sendEmail(email, body, subject, callback) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'aparnasawant1903@gmail.com',
               pass: 'Aparna@19'
           }
    })

    const mailOptions = {
        from: 'aparnasawant1903@gmail.com', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: body // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else  {
            console.log(info)
        }

        callback(error, info)
    })
}

module.exports = {
    send: sendEmail
}