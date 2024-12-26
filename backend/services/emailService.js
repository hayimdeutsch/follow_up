import { sendEmail as sendGmail } from "./googleService.js";
import { systemTransporter } from "../config/emailConfig.js";

const sendFromTeacher = async (teacher, studentEmail, subject, content) => {
  try {
    await sendGmail(teacher, studentEmail, subject, content);
  } catch (error) {
    sendFromSystem(studentEmail, subject, content);
    // Need to adjust the content to indicate the teacher it was sent from
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
