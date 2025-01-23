import React, { useState, useEffect } from "react";
import { backendUrl } from "../config/config.js";

const ScheduledEmails = ({ studentId, initialEmails, onEmailsChange }) => {
  const [scheduledEmails, setScheduledEmails] = useState(initialEmails);
  const [newEmailDate, setNewEmailDate] = useState("");

  useEffect(() => {
    setScheduledEmails(initialEmails);
  }, [initialEmails]);

  const handleAddEmail = async () => {
    const updatedEmails = [...scheduledEmails, { scheduledDate: newEmailDate }];
    setScheduledEmails(updatedEmails);
    await updateScheduledEmails(updatedEmails);
    onEmailsChange(updatedEmails);
  };

  const handleRemoveEmail = async (index) => {
    const updatedEmails = scheduledEmails.filter((_, i) => i !== index);
    setScheduledEmails(updatedEmails);
    await updateScheduledEmails(updatedEmails);
    onEmailsChange(updatedEmails);
  };

  const updateScheduledEmails = async (emails) => {
    try {
      const response = await fetch(
        `${backendUrl}/students/${studentId}/emails`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ scheduledEmails: emails }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update scheduled emails");
      }
    } catch (error) {
      console.error("Error updating scheduled emails:", error);
    }
  };

  return (
    <div>
      <h2>Follow Up Emails</h2>
      <ul>
        {scheduledEmails.map((followUp, index) => (
          <li key={index}>
            {new Date(followUp.scheduledDate).toDateString()}
            <button onClick={() => handleRemoveEmail(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="date"
        value={newEmailDate}
        onChange={(e) => setNewEmailDate(e.target.value)}
      />
      <button onClick={handleAddEmail}>Add Email</button>
    </div>
  );
};

export default ScheduledEmails;
