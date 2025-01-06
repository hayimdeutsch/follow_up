// import React, { useState, useEffect } from "react";

// const EmailForm = ({
//   student,
//   token,
//   sendQuestionnaire,
//   scheduleMeeting,
//   emailText,
//   setEmailText,
// }) => {

//   useEffect(() => {
//     const followUpLink = new URL(
//       `/followup?token=${token}`,
//       window.location.origin
//     ).href;
//     let defaultText = `<p>Dear ${student.firstName},</p>`;
//     if (sendQuestionnaire && scheduleMeeting) {
//       defaultText += `<p>Please fill out the questionnaire and schedule a meeting using the following link: <a href="${followUpLink}">Follow Up Link</a></p>`;
//     } else if (sendQuestionnaire) {
//       defaultText += `<p>Please fill out the questionnaire using the following link: <a href="${followUpLink}">Questionnaire Link</a></p>`;
//     } else if (scheduleMeeting) {
//       defaultText += `<p>Please schedule a meeting using the following link: <a href="${followUpLink}">Meeting Link</a></p>`;
//     }
//     defaultText += `<p>Best regards,<br/>Your Teacher</p>`;
//     setEmailText(defaultText);
//   }, [sendQuestionnaire, scheduleMeeting, token, student]);

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Email Text:</label>
//         <textarea
//           value={emailText}
//           onChange={(e) => setEmailText(e.target.value)}
//           rows="10"
//           cols="50"
//         />
//       </div>
//       <button type="submit">Send Email</button>
//     </form>
//   );
// };

// export default EmailForm;

import React, { useEffect, useState } from "react";

const EmailForm = ({
  student,
  token,
  isQuestionnaire,
  isMeeting,
  emailText,
  setEmailText,
}) => {
  const [emailModified, setEmailModified] = useState(false);

  useEffect(() => {
    if (!emailModified) {
      const followUpLink = new URL(
        `/followup?token=${token}`,
        window.location.origin
      ).href;
      let defaultText = `Dear ${student.firstName},\n\n`;
      if (isQuestionnaire && isMeeting) {
        defaultText += `Please fill out the questionnaire and schedule a meeting using the following link: ${followUpLink}\n\n`;
      } else if (isQuestionnaire) {
        defaultText += `Please fill out the questionnaire using the following link: ${followUpLink}\n\n`;
      } else if (isMeeting) {
        defaultText += `Please schedule a meeting using the following link: ${followUpLink}\n\n`;
      }
      defaultText += `Best regards,\nYour Teacher`;
      setEmailText(defaultText);
    }
  }, [isQuestionnaire, isMeeting, token, student, setEmailText, emailModified]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <textarea
        value={emailText}
        onChange={(e) => setEmailText(e.target.value)}
        rows="10"
        cols="50"
      />
    </div>
  );
};

export default EmailForm;
