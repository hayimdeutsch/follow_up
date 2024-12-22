import { sendEmail as sendGmail } from "./googleService.js";
import { systemTransporter } from "../config/emailConfig.js";

const sendFromTeacher = async (teacher, studentEmail, subject, content) => {
  try {
    await sendGmail(teacher, studentEmail, subject, content);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Failed to send email", error);
  }
};

const sendFromSystem = async (to, subject, content) => {
  return await systemTransporter.sendMail({
    from: process.env.SYSTEM_EMAIL,
    to,
    subject,
    html: content,
  });
};

export { sendFromTeacher, sendFromSystem };
