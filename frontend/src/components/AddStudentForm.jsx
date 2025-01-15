import React, { useState } from "react";

const AddStudentForm = ({ teacher }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [scheduledEmails, setScheduledEmails] = useState([
    { scheduledDate: "" },
  ]);
  const [error, setError] = useState("");

  const handleAddFollowUp = () => {
    setScheduledEmails([...scheduledEmails, { scheduledDate: "" }]);
  };

  const handleFollowUpChange = (index, value) => {
    const newScheduledEmails = scheduledEmails.map((followUp, i) =>
      i === index ? { scheduledDate: value } : followUp
    );
    setScheduledEmails(newScheduledEmails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/teachers/students`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          eventDate,
          scheduledEmails,
        }),
      });
      if (response.ok) {
        alert("Student added successfully");
        // Clear the form
        setFirstName("");
        setLastName("");
        setEmail("");
        setEventDate("");
        setScheduledEmails([{ scheduledDate: "" }]);
      } else {
        setError("Failed to add student");
      }
    } catch (error) {
      setError("Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Event Date:</label>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Follow Up Emails:</label>
        {scheduledEmails.map((followUp, index) => (
          <div key={index}>
            <input
              type="date"
              value={followUp.scheduledDate}
              onChange={(e) => handleFollowUpChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddFollowUp}>
          Add Follow Up
        </button>
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudentForm;
