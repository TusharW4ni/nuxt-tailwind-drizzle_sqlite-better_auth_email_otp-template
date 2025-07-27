import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./drizzle";
import { emailOTP } from "better-auth/plugins";
import { user, account, session, verification } from "../db/schema/auth-schema";
// import { sendMail } from "./mailer"; // [!code ++] Import your mailer utility
import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

const rc = useRuntimeConfig();

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: { user, account, session, verification },
  }),
  secret: rc.BETTER_AUTH_SECRET,
  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 5 * 60, // 5 minutes
      allowedAttempts: 3,
      async sendVerificationOTP({ email, otp, type }) {
        console.log(`Attempting to send ${type} OTP to ${email}: ${otp}`); // Keep this for server logs

        const mailgun = new Mailgun(FormData);
        const mg = mailgun.client({
          username: "api",
          key: rc.MAILGUN_API_KEY || "",
          // When you have an EU-domain, you must specify the endpoint:
          // url: "https://api.eu.mailgun.net"
        });
        try {
          const data = await mg.messages.create(
            "sandboxbe0c99cb36754c1c835133722a71c4de.mailgun.org",
            {
              from: "Mailgun Sandbox <postmaster@sandboxbe0c99cb36754c1c835133722a71c4de.mailgun.org>",
              to: [`TW <${email}>`],
              subject: "Hello TW",
              text: `Congratulations TW, you just sent an email with Mailgun! You are truly awesome! ${otp}`,
            },
          );

          console.log(data); // logs response data
        } catch (error) {
          console.log(error); //logs any error
        }

        // let subject = "";
        // let htmlBody = "";

        // if (type === "sign-in") {
        //   subject = "Your Sign-In One-Time Password (OTP)";
        //   htmlBody = `<p>Hello,</p><p>Your one-time password (OTP) for signing in is: <strong>${otp}</strong></p><p>This OTP is valid for 5 minutes. Please do not share it with anyone.</p><p>If you did not request this, please ignore this email.</p>`;
        // } else if (type === "email-verification") {
        //   subject = "Verify Your Email - One-Time Password (OTP)";
        //   htmlBody = `<p>Hello,</p><p>Your one-time password (OTP) to verify your email address is: <strong>${otp}</strong></p><p>This OTP is valid for 5 minutes. Please use it to complete your email verification.</p>`;
        // } else if (type === "forget-password") {
        //   subject = "Your Password Reset One-Time Password (OTP)";
        //   htmlBody = `<p>Hello,</p><p>Your one-time password (OTP) for resetting your password is: <strong>${otp}</strong></p><p>This OTP is valid for 5 minutes. Use it to set a new password. Do not share it.</p>`;
        // } else {
        //   subject = "Your One-Time Password (OTP)";
        //   htmlBody = `<p>Your OTP is: <strong>${otp}</strong></p>`;
        // }

        // try {
        //   await sendMail({
        //     to: email,
        //     subject: subject,
        //     text: `Your OTP is: ${otp}. It expires in 5 minutes.`, // Plain text fallback
        //     html: htmlBody,
        //   });
        //   console.log(`Successfully sent ${type} OTP to ${email}`);
        // } catch (error) {
        //   console.error(`Failed to send ${type} OTP to ${email}:`, error);
        //   // Important: Rethrow the error so Better Auth knows sending failed
        //   throw new Error("Failed to send verification OTP email.");
        // }
      },
      // Keep overrideDefaultEmailVerification: true if you want all email verifications to use OTP
      // overrideDefaultEmailVerification: true,
    }),
  ],
});
