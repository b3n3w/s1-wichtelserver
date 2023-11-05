const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require("../model/User");
const sender = '"S1 Wichtelfee" <wichtelfee@s1-wichteln.de>';

const transport = nodemailer.createTransport({
    pool: true,
    host: "smtp.ionos.de",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    }
});

transport.verify(function (err, success) {
    if (err) {
        console.log(err);
    } else {
        console.log("Mailer is ready to take messages")
    }
})

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
        subject: "S1-Wichteln - Account Bestätigung",
        text: "Hallo lieber Wichtel!,\nvielen Dank für deine Registrierung! Bitte klicke auf den nachfolgenden Link um deinen Account zu verifizieren.\n " + url,
        html: 'Hallo lieber Wichtel!,\nvielen Dank für deine Registrierung! Bitte klicke auf den nachfolgenden Link um deinen Account zu verifizieren.\n ' + url,
  
    }, (error, info) => {

        if (error) {
            console.log(error)
            return;
        }

        console.log('Message sent successfully!', info);

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
            subject: 'S1-Wichteln - Die Verlosung hat begonnen ! <3',
            text: 'Hallo lieber Wichtel!,\nIn diesem Jahr darfst du den lieben Wichtel ' + receiver.usernamename + ' beschenken! Ich wünsche dir viel Spaß!',
            html: '<b> Hallo lieber Wichtel!,\n</b><br>In diesem Jahr darfst du den lieben Wichtel <b>' + receiver.username + '</b> beschenken! Ich wünsche dir viel Spaß! \nPS: Für weitere Informationen über deinen Wichtel, werfe doch einfach einen Blick in die Wichtelgruppe.',
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