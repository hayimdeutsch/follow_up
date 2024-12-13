import Student from "../models/Student.js";
import { sendFromSystem } from "../services/emailService.js";
import { getFollowUpTemplate } from "./emailTemplates.js";

export const scheduleFollowupEmails = async (student) => {
  const delays = {
    "2month": 1000 * 60 * 60 * 24 * 60, // 60 days
    "6month": 1000 * 60 * 60 * 24 * 180, // 180 days
    "1year": 1000 * 60 * 60 * 24 * 365, // 365 days
  };

  for (const [type, delay] of Object.entries(delays)) {
    student.followupEmails.push({
      type,
      scheduledDate: new Date(Date.now() + delay),
      status: "pending",
    });
  }

  await student.save();
};

export const processScheduledEmails = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const students = await Student.find({
      followupEmails: {
        $elemMatch: {
          scheduledDate: { $gte: today, $lt: tomorrow },
          status: "pending",
          retryCount: { $lt: 3 },
        },
      },
    }).populate("teacher");

    for (const student of students) {
      await processStudentEmails(student);
    }
  } catch (error) {
    console.error("Error processing scheduled emails:", error);
  }
};
// utils/emailScheduler.js

async function processStudentEmails(student) {
  const emailsToSend = student.followupEmails.filter(
    (email) => email.status === "pending" && email.retryCount < 3
  );

  for (const email of emailsToSend) {
    try {
      const emailContent = getFollowUpTemplate(student, email.type);
      await sendFromSystem(
        student.teacher.email,
        `${email.type} Follow-up for ${student.firstName}`,
        emailContent
      );

      email.status = "sent";
      email.sentAt = new Date();
    } catch (error) {
      console.error(`Failed to send email to ${student.email}:`, error);
      email.retryCount = (email.retryCount || 0) + 1;
    }
  }

  await student.save();
}
