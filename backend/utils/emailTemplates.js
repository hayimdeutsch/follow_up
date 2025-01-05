import "dotenv/config";

const newUserApplicationTemplate = (user) => {
  return `
    <p>Dear Admin,</p>
    <p>A new user has applied and is pending approval in your dashboard.</p>
    <p>Here are the details of the applicant:</p>
    <ul>
      <li><strong>Name:</strong> ${user.firstName} ${user.lastName}</li>
      <li><strong>Email:</strong> ${user.gmail}</li>
      <li><strong>Phone:</strong> ${user.phone}</li>
    </ul>
<p>Please review the application and take the necessary actions.</p>
    <a href="${process.env.FRONTEND_URL}/admin/dashboard" target="_blank">Click here to view all users</a>
    <p>Thank you.</p>
  `;
};

const followupTemplate = (message, token) => {
  const body = `${
    teacherMessage
      ? `<p>${teacherMessage}</p>`
      : `<p>Hi ${studentFirstName},</p>
    <p>At your earliest convenience, please fill out the following questionnaire as a follow up to our classes.</p>`
  }
    <a href="${
      process.env.FRONTEND_URL
    }/questionnaires/${token}">Click here to fill out the questionnaire</a>
    <p>All the best,</p>
    <p>${teacherName}</p>`;
  return message;
};

export { followupTemplate, newUserApplicationTemplate };
