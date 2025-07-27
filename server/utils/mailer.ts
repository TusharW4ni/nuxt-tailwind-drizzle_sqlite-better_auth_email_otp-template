// server/utils/mailer.ts
import nodemailer from "nodemailer";
import { createTransport } from "nodemailer"; // This import is redundant, but often seen in examples

// Get environment variables for email configuration
const runtimeConfig = useRuntimeConfig();

// Define a type for the email options
interface SendMailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

// Create a Nodemailer transporter
// This will vary depending on your email service.
// For Gmail, you might need to enable "Less secure app access"
// or preferably, use an "App password" if you have 2FA enabled.
const transporter = createTransport({
  host: runtimeConfig.EMAIL_HOST || "smtp.gmail.com", // e.g., 'smtp.gmail.com' for Gmail
  port: Number(runtimeConfig.EMAIL_PORT) || 465, // 465 for SSL, 587 for TLS
  secure: runtimeConfig.EMAIL_SECURE === "true", // Use 'true' for 465 (SSL), 'false' for 587 (TLS)
  auth: {
    user: runtimeConfig.EMAIL_USER, // Your email address
    pass: runtimeConfig.EMAIL_PASS, // Your email password or app password
  },
});

export async function sendMail({ to, subject, text, html }: SendMailOptions) {
  try {
    const info = await transporter.sendMail({
      from:
        runtimeConfig.EMAIL_FROM ||
        '"Better Auth App" <no-reply@yourdomain.com>', // Sender address
      to, // List of receivers
      subject, // Subject line
      text, // Plain text body
      html, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    // You can also log the preview URL for Mailtrap/Ethereal if using them for testing
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}
