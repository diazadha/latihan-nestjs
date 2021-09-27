// "use strict";
// const nodemailer = require("nodemailer");
import * as nodemailer from 'nodemailer';
// async..await is not allowed in global scope, must use a wrapper
export const sendemail = async () => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.googlemail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "qurban.in24@gmail.com", // generated ethereal user
            pass: "Qurbanin2403", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Todo List 👻" <foo@example.com>', // sender address
        to: "diaz.adha@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Selamat kamu telah berhasil menambah todolist baru!", // plain text body
        html: "<b>Selamat kamu telah berhasil menambah todolist baru!</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}