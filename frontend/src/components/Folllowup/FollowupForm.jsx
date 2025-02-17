import React, { useState, useEffect } from "react";
import QuestionnaireForm from "./QuestionnaireForm";
import MeetingForm from "./MeetingForm";

const FollowUpForm = ({ mode, followupId }) => {
  const [followupData, setFollowupData] = useState(null);

  useEffect(() => {
    if (mode === "edit" && followupId) {
      // Fetch follow-up data for editing
      fetchFollowUpData(followupId).then((data) => setFollowupData(data));
    }
  }, [mode, followupId]);

  const fetchFollowUpData = async (id) => {
    // Fetch follow-up data from the server
    const response = await fetch(`/api/followups/${id}`);
    const data = await response.json();
    return data;
  };

  return (
    <div>
      <h2>{mode === "create" ? "Create Follow-up" : "Edit Follow-up"}</h2>
      <QuestionnaireForm data={followupData?.questionnaire} />
      <MeetingForm data={followupData?.meeting} />
    </div>
  );
};

export default FollowUpForm;
