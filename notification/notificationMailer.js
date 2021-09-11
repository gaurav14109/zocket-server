const nodeMailer = require('../config/nodemailer')

//template can also be created
exports.sendNotification = (email) => {
        
        var mailOptions = {
            from: 'gauravgusain48@gmail.com',
            to: email,
            subject: 'Sending Email using Node.js',
            html:`<p>Kindly copy/Go below Link</p><br/><a href="http://localhost:3000/registeration">http://localhost:3000/registeration</a>`
        };
        nodeMailer.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            return
        });
}
//A middlware is which can be passed to the api function