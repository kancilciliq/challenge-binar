const nodemailer = require ('nodemailer')

const email = () => {
    const tranporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "kancilciliq@gmail.com",
            pass: process.env.pass
        }
    })

    const mail = {
        from: 'kancilciliq@gmail.com',
        to: 'murtado47@gmail.com',
        subject: 'hellllo',
        text: 'are you oke?'
    }

    tranporter.sendMail(mail, (err, info) => {
        if (err) {
            console.log(err)
        } else {
           console.log(`email sent ${info.response}`) 
        }
    })
}

module.exports = {
    email
}