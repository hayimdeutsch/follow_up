import React, { useState, useEffect } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import QuestionnaireForm from "../components/QuestionnaireForm";
import MeetingSelector from "../components/MeetingSelector";
import EmailForm from "../components/EmailForm";
import { backendUrl } from "../config/config.js";

const FollowUpPage = () => {
  const { studentId } = useParams();
  const location = useLocation();
  const [emailText, setEmailText] = useState("");
  const [questionnaire, setQuestionnaire] = useState({});
  const [meeting, setMeeting] = useState({});
  const [isQuestionnaire, setIsQuestionnaire] = useState(
    location.state?.options?.sendQuestionnaire || false
  );
  const [isMeeting, setIsMeeting] = useState(
    location.state?.options?.scheduleMeeting || false
  );
  const student = location.state?.student;
  const [title, setTitle] = useState(
    `Follow-up for ${student.firstName} ${student.lastName}`
  );

  const handleSubmit = async () => {
    const convertToHtml = (text) => {
      return text
        .split("\n")
        .map((line) => `<p>${line}</p>`)
        .join("");
    };

    try {
      const response = await fetch(
        `${backendUrl}/students/${studentId}/followups`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title,
            emailText,
            options: { isQuestionnaire, isMeeting },
            questionnaire,
            meeting,
          }),
        }
      );
      if (response.ok) {
        alert("Follow-up submitted successfully!");
      } else {
        alert("Failed to submit follow-up");
      }
    } catch (error) {
      console.error("Error submitting follow-up:", error);
    }
  };

  const toggleSendQuestionnaire = () => {
    setIsQuestionnaire(!isQuestionnaire);
  };

  const toggleScheduleMeeting = () => {
    setIsMeeting(!isMeeting);
  };

  return (
    <div>
      <h1>{`Follow Up for ${student.firstName} ${student.lastName}`}</h1>
      <label> Title: </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter the title of the follow-up"
      />
      <button onClick={toggleSendQuestionnaire}>
        {isQuestionnaire ? "Remove Questionnaire" : "Add Questionnaire"}
      </button>
      <button onClick={toggleScheduleMeeting}>
        {isMeeting ? "Remove Meeting" : "Add Meeting"}
      </button>
      {isQuestionnaire && (
        <QuestionnaireForm onQuestionnaireChange={setQuestionnaire} />
      )}
      {isMeeting && <MeetingSelector onMeetingChange={setMeeting} />}
      <EmailForm
        student={student}
        isQuestionnaire={isQuestionnaire}
        isMeeting={isMeeting}
        handleSendEmail={handleSubmit}
        emailText={emailText}
        setEmailText={(text) => {
          setEmailText(text);
        }}
      />
      <button onClick={handleSubmit}>Submit Follow-Up</button>
    </div>
  );
};

export default FollowUpPage;
