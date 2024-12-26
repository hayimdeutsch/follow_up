import React, { useState } from "react";

const AddStudentForm = ({ teacher }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [followUps, setFollowUps] = useState([{ time: "2 months" }]);
  const [error, setError] = useState("");

  const handleAddFollowUp = () => {
    setFollowUps([...followUps, { time: "2 months" }]);
  };

  const handleFollowUpChange = (index, value) => {
    const newFollowUps = followUps.map((followUp, i) =>
      i === index ? { time: value } : followUp
    );
    setFollowUps(newFollowUps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/${teacher}/students`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            eventDate,
            followUps,
          }),
        }
      );
      if (response.ok) {
        alert("Student added successfully");
        // Clear the form
        setFirstName("");
        setLastName("");
        setEmail("");
        setEventDate("");
        setFollowUps([{ time: "2 months" }]);
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
        <label>Follow Ups:</label>
        {followUps.map((followUp, index) => (
          <div key={index}>
            <select
              value={followUp.time}
              onChange={(e) => handleFollowUpChange(index, e.target.value)}
              required
            >
              <option value="2 months">2 months</option>
              <option value="6 months">6 months</option>
              <option value="1 year">1 year</option>
            </select>
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
