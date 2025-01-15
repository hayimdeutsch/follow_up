import { sendEmail as sendGmail } from "./googleService.js";
import { systemTransporter } from "../config/emailConfig.js";
import CustomError from "../utils/CustomError.js";

const sendFromTeacher = async (teacherObj, studentEmail, subject, content) => {
  try {
    await sendGmail(teacherObj, studentEmail, subject, content);
  } catch (error) {
    console.error("Failed to send email", error);
    try {
      const newSubject = `Message from ${teacherObj.firstName} ${teacherObj.lastName}`;
      await sendFromSystem(studentEmail, newSubject, content);
    } catch (error) {
      console.error("Failed to send email", error);
      throw new CustomError("Failed to send email", 500);
    }
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
