import {
  systemTransporter,
  createGmailTransporter,
} from "../config/email.config.js";

export const sendFromTeacher = async (
  teacher,
  studentEmail,
  subject,
  content
) => {
  const transporter = await createGmailTransporter(teacher);
  return transporter.sendMail({
    from: teacher.email,
    to: studentEmail,
    subject,
    html: content,
  });
};

export const sendFromSystem = async (to, subject, content) => {
  return systemTransporter.sendMail({
    from: process.env.SYSTEM_EMAIL,
    to,
    subject,
    html: content,
  });
};
