import nodemailer from 'nodemailer'
import envVars from '../../../config/envVars';

const emailSender = async (
    email: string,
    html: string
) => {
    const transporter = nodemailer.createTransport({
        host: envVars.email.SMTP_HOST as string,
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: envVars.email.SMTP_USER as string,
            pass: envVars.email.SMTP_PASS as string, // app password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const info = await transporter.sendMail({
        from: envVars.email.SMTP_FROM as string, // sender address
        to: email, // list of receivers
        subject: "Reset Password Link", // Subject line
        //text: "Hello world?", // plain text body
        html, // html body
    });

}

export default emailSender;