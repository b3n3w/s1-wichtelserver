const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const testmessage = {

    from: '"S1 Wichtelfee" <wichtelfee@s1-wichteln.de>',
    to: 'benedikt.wagner95@gmail.com',
    subject: 'Nice Nodemailer test',
    text: 'Hey there, it’s our first message sent with Nodemailer ; ',
    html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer'
};


const transport = nodemailer.createTransport({
    pool: true,
    host: "smtp.ionos.de",
    port: 465,
    secure: true,
    auth: {
        user: "wichtelfee@s1-wichteln.de",
        pass: process.env.MAIL_PASS,
    }
});

transport.verify(function (err, success) {
    if (err) {
        console.log(err);
    } else {
        console.log("IONOSis ready to take messages")
    }
})

const sendRegisterMail = (req) => {

    console.log("testmail");
    var message = {
        from: '"S1 Wichtelfee" <wichtelfee@s1-wichteln.de>',
        to: req,
        subject: 'Willkommen beim alljährlichen S1-Wichteln! ',
        text: 'Hallo lieber Wichtel !, meine Name ist Shanti die Wichtelfee und ich darf dich herzlichst beim diesjährigen S1 Wichteln begrüßen',
        html: '<b> Hallo lieber Wichtel !,</b><br>  meine Name ist Shanti die Wichtelfee und ich darf dich herzlichst beim diesjährigen S1 Wichteln begrüßen'
    };
    transport.sendMail(message, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent : %s', info.messageId)
    })
}

exports.sendAccountVerify = (req) => {
    var rand = Math.floor((Math.random() * 100) + 54)
    var host = req.get('host');
    var link = "http://" + host + "/verify?id=" + rand;
}


const testmail = (req, res) => {
    console.log("test");
    transport.sendMail(testmessage, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}

module.exports = sendRegisterMail;