import nodemailer from 'nodemailer'
const emailVarification = async (name, email, user_id) => {
    try {
        const transporter = await nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: 'joyce4@ethereal.email',
                pass: 'ptYzEN426z2jjFUueh'
            },
        });

        let info = await transporter.sendMail({
            from: '"tarun sharma",<tarun@gmial.com>',// list of receivers
            to: `${email}, baz@example.com`,
            subject: "Email Verification ", // Subject line
            text: "email is Verification ", // plain text body
            html: "<b>Congratulation you email is Verified </b>", // html body
        })

        console.log("Message sent: %s", info.messageId);
        return info

    } catch (error) {
        console.log(error)
    }
}

export { emailVarification }