import React, { useState, useEffect } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import QuestionnaireForm from "../components/QuestionnaireForm";
import MeetingSelector from "../components/MeetingSelector";
import EmailForm from "../components/EmailForm";
import generateToken from "../utils/generateToken";

const FollowUpPage = () => {
  const { studentId } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || generateToken();
  const [emailText, setEmailText] = useState("");
  const [questionnaire, setQuestionnaire] = useState([]);
  const [meetingDetails, setMeetingDetails] = useState({});
  const [isQuestionnaire, setIsQuestionnaire] = useState(
    location.state?.options?.sendQuestionnaire || false
  );
  const [isMeeting, setIsMeeting] = useState(
    location.state?.options?.scheduleMeeting || false
  );
  const student = location.state?.student;

  const handleSubmit = async () => {
    const convertToHtml = (text) => {
      return text
        .split("\n")
        .map((line) => `<p>${line}</p>`)
        .join("");
    };

    const emailHtml = convertToHtml(emailText);

    try {
      const response = await fetch(`http://localhost:3000/teachers/followup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          studentId,
          emailContent: emailHtml,
          token,
          options: { isQuestionnaire, isMeeting },
          questionnaire,
          meetingDetails,
        }),
      });
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
      <button onClick={toggleSendQuestionnaire}>
        {isQuestionnaire ? "Remove Questionnaire" : "Add Questionnaire"}
      </button>
      <button onClick={toggleScheduleMeeting}>
        {isMeeting ? "Remove Meeting" : "Add Meeting"}
      </button>
      {isQuestionnaire && (
        <QuestionnaireForm onQuestionnaireChange={setQuestionnaire} />
      )}
      {isMeeting && <MeetingSelector onMeetingChange={setMeetingDetails} />}
      <EmailForm
        student={student}
        token={token}
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
