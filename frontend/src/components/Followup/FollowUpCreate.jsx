import React, { useState } from "react";
import QuestionnaireForm from "../QuestionnaireForm";
import MeetingForm from "../MeetingSelector.jsx";
import EmailForm from "../EmailForm";
import { backendUrl } from "../../config/config.js";
import useProtectedApi from "../../hooks/useProtectedApi.js";

const FollowUpCreate = ({ student }) => {
  const [title, setTitle] = useState("");
  const [emailText, setEmailText] = useState("");
  const [questionnaire, setQuestionnaire] = useState({});
  const [meeting, setMeeting] = useState({});
  const [isQuestionnaire, setIsQuestionnaire] = useState(false);
  const [isMeeting, setIsMeeting] = useState(false);
  const { data, loading, executeRequest } = useProtectedApi();
  const handleSubmit = async () => {
      executeRequest("/students/followups", "POST", {
        title,
        emailText,
        options: { isQuestionnaire, isMeeting },
        questionnaire,
        meeting,
      });
  };

  return (
    <div>
      <h2>Create Follow-up</h2>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter the title of the follow-up"
      />
      <button onClick={() => setIsQuestionnaire(!isQuestionnaire)}>
        {isQuestionnaire ? "Remove Questionnaire" : "Add Questionnaire"}
      </button>
      <button onClick={() => setIsMeeting(!isMeeting)}>
        {isMeeting ? "Remove Meeting" : "Add Meeting"}
      </button>
      {isQuestionnaire && <QuestionnaireForm onQuestionnaireChange={setQuestionnaire} />}
      {isMeeting && <MeetingForm onMeetingChange={setMeeting} />}
      {/* <EmailForm
        emailText={emailText}
        setEmailText={setEmailText}
        handleSendEmail={handleSubmit}
      /> */}
      <button onClick={handleSubmit}>Submit Follow-Up</button>
    </div>
  );
};

export default FollowUpCreate;