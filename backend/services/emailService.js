import { sendEmail as sendGmail } from "./googleService.js";
import { systemTransporter } from "../config/emailConfig.js";

const sendFromTeacher = async (teacher, studentEmail, subject, content) => {
  try {
    await sendGmail(teacher, studentEmail, subject, content);
  } catch (error) {
    const newSubject = `Message from ${teacher.firstName} ${teacher.lastName}`;
    sendFromSystem(studentEmail, newSubject, content);
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
