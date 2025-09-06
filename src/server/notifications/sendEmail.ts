import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, html: string) {
  // TODO: Swap to Resend when configured
  const transport = nodemailer.createTransport(process.env.EMAIL_SERVER as string);
  await transport.sendMail({ to, subject, html, from: process.env.EMAIL_FROM });
} 