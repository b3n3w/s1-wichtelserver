const nodemailer = require('nodemailer');

const testmessage = {

    from: '"S1 Wichtelfee" <wichtelfee@s1-wichteln.de>',
    to: 'benedikt.wagner95@gmail.com',
    subject: 'Nice Nodemailer test',
    text: 'Hey there, it’s our first message sent with Nodemailer ;) ',
    html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer'
};


const transport = nodemailer.createTransport({
    pool: true,
    host: "smtp.ionos.de",
    port: 465,
    secure: true,
    auth: {
        user: "wichtelfee@s1-wichteln.de",
        pass: "^CmDvo7Y%k*ukajpw"
    }
});

transport.verify(function (err, success) {
    if (err) {
        console.log(err);
    } else {
        console.log("IONOSis ready to take messages")
    }
})

const testmail = (req, res)=>  {
    console.log("test");
    transport.sendMail(testmessage, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}

module.exports = testmail;