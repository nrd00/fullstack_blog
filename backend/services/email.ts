
import nodemailer from "nodemailer";

export const sendOTPEmail = async (email:string, otp:string) => {
  // Create transporter when sending email,
  // so environment variables are read at runtime.

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Your Application" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Email Verification OTP",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Verify Your Email Address</h2>
        <p>Your verification code is:</p>
        <h1 style="letter-spacing: 8px;">${otp}</h1>
        <p>This code expires in 5 minutes.</p>
      </div>
    `,
  });
};
