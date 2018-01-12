var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'automationtryout@gmail.com',
	pass: 'aut0mat1cR3v0luti0n'
    }
});

var mailOptions = {
    from: "automationtryout@gmail.com",
    to: "iliana.tomi@gmail.com",
    subject: "Room Door Notification",
    text: ""
};


const sendMail = (context) => {
    mailOptions.text = context;
    transporter.sendMail(updatedMailOptions, (err, data) => {
        if (err) {
            console.log("Mail error: " + err);
        } else {
	    console.log("Email sent: " + data.response);
        }
    });
}


module.exports = {
    sendMail
}

