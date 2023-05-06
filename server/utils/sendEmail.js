const nodemailer = require("nodemailer");

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.APP_EMAIL_ADDRESS,
                pass: process.env.APP_EMAIL_PASSWORD,
            },
            from: "E-shop App <ahmedmostafa8452@gmail.com>",
        });
    }

    async sendEmail(options) {
        const mailOpts = {
            from: "E-shop App <ahmedmostafa8452@gmail.com>",
            to: options.email,
            subject: options.subject,
            text: options.message,
        };
        await this.transporter.sendMail(mailOpts);
    }
}

module.exports = EmailService;
