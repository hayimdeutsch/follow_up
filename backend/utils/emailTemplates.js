import config from "../config/envConfig.js";

const newUserApplicationTemplate = (user) => {
  return `
    <p>Dear Admin,</p>
    <p>A new user has applied and is pending approval in your dashboard.</p>
    <p>Here are the details of the applicant:</p>
    <ul>
      <li><strong>Name:</strong> ${user.firstName} ${user.lastName}</li>
      <li><strong>Email:</strong> ${user.email}</li>
      <li><strong>Phone:</strong> ${user.phone}</li>
    </ul>
<p>Please review the application and take the necessary actions.</p>
    <a href="${config.frontendUrl}/admin/dashboard" target="_blank">Click here to view all users</a>
    <p>Thank you.</p>
  `;
};

const formatFollowupEmail = (emailText, token, followupOptions) => {
  let linkMessage;
  if (followupOptions.questionnaire && followupOptions.meeting) {
    linkMessage =
      "Click here to fill out the questionnaire and schedule a meeting";
  } else if (followupOptions.questionnaire) {
    linkMessage = "Click here to fill out the questionnaire";
  } else if (followupOptions.meeting) {
    linkMessage = "Click here to schedule a meeting";
  }
  const link = `<a href="${config.frontendUrl}/followups/${token}" target="_blank">${linkMessage}</a>`;
  const paragraphs = emailText
    .split("\n")
    .map((line) => `<p>${line}</p>`)
    .join("");
  return `${paragraphs}${link}`;
};

const followupSubmissionTemplate = (
  teacherName,
  studentName,
  studentId,
  followupId
) => {
  return `
    <p>Hi ${teacherName},</p>
    <p>${studentName} has submitted a follow-up questionnaire.</p>
    <a href="${config.frontendUrl}/students/followups/${followupId}?studentId=${studentId}" target="_blank">
    Click here to view the followup</a>
    <p>Thank you.</p>
  `;
};

export {
  formatFollowupEmail,
  newUserApplicationTemplate,
  followupSubmissionTemplate,
};
