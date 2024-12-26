import "dotenv/config.js";
import nodemailer from "nodemailer";

export const systemTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
