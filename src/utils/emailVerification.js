import nodemailer from "nodemailer";
import config from "config";

const ownEmail = config.get('ownEmail');
const emailPass = config.get('emailPass');

export const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: ownEmail,
        pass: emailPass,
    },
    secure: true,
});

export function mailData(to, subject, text, html) {
    return {
        from: ownEmail,
        to, // Send the registration email to the provided user's email address
        subject,
        text,
        html,
    }
};