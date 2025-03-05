/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import User from "@/models/userModel";
import crypto from "crypto";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const domain = process.env.DOMAINE || "http://localhost:3000";

        // ✅ Génération d'un token sécurisé et court
        const token = crypto.randomBytes(32).toString("hex");

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: token,
                verifyTokenExpiry: new Date(Date.now() + 3600000), // Expiration en 1h
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: token,
                forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
            });
        } 

        // ✅ Création du transporteur SMTP avec Mailtrap
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.USER_CODE,
                pass: process.env.PASSWORD_CODE,
            },
        });

        // ✅ Lien à envoyer
        const verificationLink =
            emailType === "VERIFY"
                ? `${domain}/verifyemail?token=${token}`
                : `${domain}/resetpassword?token=${token}`;

        // ✅ Contenu de l’email avec lien cliquable + copiable
        const mailOptions = {
            from: "kando@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
                <p>Click the link below to ${
                    emailType === "VERIFY" ? "verify your email" : "reset your password"
                }:</p>
                <p>
                    <a href="${verificationLink}" target="_blank" style="color: blue; text-decoration: underline;">
                        ${verificationLink}
                    </a>
                </p>
                <p>Or copy and paste this link into your browser:</p>
                <p style="font-weight: bold;">${verificationLink}</p>
                <p>This link is valid for 1 hour.</p>
            `,
        };

        // ✅ Envoi de l’email
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        console.error("❌ Error sending email:", error);
        throw new Error(error.message);
    }
};
