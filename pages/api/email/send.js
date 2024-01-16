// import { EmailTemplate } from '../../../components/EmailTemplate';
import nodemailer from 'nodemailer';

const fromEmail = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: fromEmail,
        pass: emailPass,
    },
});

export default async function handler(req, res) {
    const { email, subject, message } = await req.body;
    console.log(email, subject, message);
    try {
        const info = await transporter.sendMail({
            from: fromEmail, // sender address
            to: [email, fromEmail], // list of receivers
            subject: subject, // Subject line
            text: message, // plain text body
            // html: "<b>Hello world?</b>", // html body
        });
        return res.status(200).json(info);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
