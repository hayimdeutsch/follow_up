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
      let defaultText = `Dear ${student.firstName},\n\n`;
      if (isQuestionnaire && isMeeting) {
        defaultText += `Please fill out the questionnaire and schedule a meeting using the following link: \n\n`;
      } else if (isQuestionnaire) {
        defaultText += `Please fill out the questionnaire using the following link: \n\n`;
      } else if (isMeeting) {
        defaultText += `Please schedule a meeting using the following link: \n\n`;
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
