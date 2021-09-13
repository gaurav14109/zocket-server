var nodemailer = require('nodemailer');
//create transport through which medium it has to be transmitted.
var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'gauravgusain48',
        pass: 'Ga'
    }
});


module.exports = {
    transporter: transporter
}
//Middleware is a fuction which is called inside the crud function for any sort of validation check 
//config is which not be called inside the function
