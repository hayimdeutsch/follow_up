export const getFollowUpTemplate = (student, emailType) => {
  const templates = {
    '2month': `
      <h1>2 Month Follow-up</h1>
      <p>Dear ${student.firstName},</p>
      ...
    `,
    '6month': `
      <h1>6 Month Follow-up</h1>
      <p>Dear ${student.firstName},</p>
      ...
    `,
    '1year': `
      <h1>1 Year Follow-up</h1>
      <p>Dear ${student.firstName},</p>
      ...
    `
  };
  return templates[emailType];
};