const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require("../model/User");

const sender = '"S1 Wichtelfee" <wichtelfee@s1-wichteln.de>';
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
        console.log("Mailer is ready to take messages")
    }
})

const sendRegisterMail = (req) => {


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

const sendAccountVerify = async (user) => {
    var date = new Date();

    var mail = {
        "id": user._id,
        "created": date.toString()
    }

    const mail_token_verification = jwt.sign(mail, process.env.JWT_VERIFY_KEY, { expiresIn: '1d' });
    var url = process.env.VUE_APP_API_ENDPOINT + "user/verify?id=" + mail_token_verification;

    let transportMail = await transport.sendMail({
        from: sender,
        to: user.email,
        subject: "S1-Wichteln Account Bestätigung",
        text: "Ey jo bitte klick auf den Link " + url,
    }, (error, info) => {

        if (error) {
            console.log(error)
            return;
        }
        console.log('Message sent successfully!');
     
        transporter.close();
    });
}


const sendWichtelMails = async (group) => {
    var wichtelMessage = "";

 
    for (const pair of group) {
        let wichtel = await User.findById(pair[0]._id);
        let receiver = await User.findById(pair[1]._id);

        wichtelMessage = {
            from: sender,
            to: wichtel.email,
            subject: 'Die Verlosung hat begonnen ! <3',
            text: 'Hallo lieber Wichtel !, In diesem Jahr darfst du den lieben Wichtel '  + receiver.usernamename + ' beschenken! Ich wünsche dir viel Spaß!',
            html: '<b> Hallo lieber Wichtel !,</b><br>  In diesem Jahr darfst du den lieben Wichtel ' + receiver.username + ' beschenken! Ich wünsche dir viel Spaß!'
        };

        await transport.sendMail(wichtelMessage, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    }
}
module.exports = {
    sendAccountVerify: sendAccountVerify,
    sendWichtelMails: sendWichtelMails
}