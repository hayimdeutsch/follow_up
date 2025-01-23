import React, { useState } from "react";
import useSubmit from "../hooks/useSubmit.js";
import { protectedApi } from "../services/api.js";
// import { validateAddStudent } from "../services/validators.js";

const AddStudentForm = () => {
  const [inputError, setInputError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    eventDate: "",
    scheduledEmails: [{ scheduledDate: "" }],
  });

  const {
    loading,
    data,
    error: submissionError,
    submit,
  } = useSubmit("/students", protectedApi);

  const handleInputChange = (e) => {
    setInputError(null);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddFollowUp = () => {
    setFormData((prevData) => ({
      ...prevData,
      scheduledEmails: [...prevData.scheduledEmails, { scheduledDate: "" }],
    }));
  };

  const handleFollowUpChange = (index, value) => {
    const newScheduledEmails = formData.scheduledEmails.map((followUp, i) =>
      i === index ? { scheduledDate: value } : followUp
    );
    setFormData((prevData) => ({
      ...prevData,
      scheduledEmails: newScheduledEmails,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //validateAddStudent(formData);
    } catch (error) {
      setInputError(error.message);
    }
    submit(formData);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (submissionError) {
    return <div>Error: {error}</div>;
  }

  if (data) {
    alert("Student added successfully");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      eventDate: "",
      scheduledEmails: [{ scheduledDate: "" }],
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Event Date:</label>
        <input
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Scheduled Emails:</label>
        {formData.scheduledEmails.map((followUp, index) => (
          <div key={index}>
            <input
              type="date"
              value={followUp.scheduledDate}
              onChange={(e) => handleFollowUpChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddFollowUp}>
          Add Follow-Up Email
        </button>
      </div>
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudentForm;
