import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./drizzle";
import { emailOTP } from "better-auth/plugins";
import { user, account, session, verification } from "../db/schema/auth-schema";

const rc = useRuntimeConfig();

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user,
      account,
      session,
      verification,
    },
  }),
  secret: rc.BETTER_AUTH_SECRET,
  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 5 * 60, // 5 minutes
      allowedAttempts: 3,
      async sendVerificationOTP({ email, otp, type }) {
        // if (type === "sign-in") {
        // } else {
        // }
        console.log(`Sending ${type} OTP to ${email}: ${otp}`);
      },
    }),
  ],
});
