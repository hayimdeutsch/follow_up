export const getFollowUpTemplate = (student, emailType) => {
  const templates = {
    "2month": `
      <h1>2 Month Follow-up</h1>
      <p>Dear ${student.firstName},</p>
      ...
    `,
    "6month": `
      <h1>6 Month Follow-up</h1>
      <p>Dear ${student.firstName},</p>
      ...
    `,
    "1year": `
      <h1>1 Year Follow-up</h1>
      <p>Dear ${student.firstName},</p>
      ...
    `,
  };
  return templates[emailType];
};

export const newUserApplicationTemplate = (user) => {
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
    <form action="http://localhost:3000/admin/users/${user.email}/approve" method="post">
      <button type="submit">Click here to approve the user</button>
    </form>
    <p>Thank you.</p>
  `;
  // Need to add the actual link to the admin dashboard
};
