import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Questionnaire from "../components/Questionnaire";
import MeetingTimeSelector from "../components/MeetingTimeSelector";
import { backendUrl } from "../config/config";

const StudentFollowUpPage = () => {
  const { token } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowUp = async () => {
      try {
        const response = await fetch(`${backendUrl}/followups/${token}`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setQuestionnaire(data.questionnaire);
          setMeetingDetails(data.meeting);
        } else {
          setError("Failed to fetch follow-up details");
        }
      } catch (error) {
        setError("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowUp();
  }, [token]);

  const handleQuestionnaireChange = (updatedQuestions) => {
    setQuestionnaire((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleTimeSlotChange = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${backendUrl}/followups/${token}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questions: questionnaire?.questions,
          selectedTimeSlot,
        }),
      });
      if (response.ok) {
        alert("Follow-up submitted successfully!");
      } else {
        setError("Failed to submit follow-up");
      }
    } catch (error) {
      setError("Error: " + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Student Follow-Up</h1>
      {questionnaire && (
        <Questionnaire
          questionnaire={questionnaire}
          onAnswerChange={handleQuestionnaireChange}
        />
      )}
      {meetingDetails && (
        <MeetingTimeSelector
          meetingDetails={meetingDetails}
          onTimeSlotChange={handleTimeSlotChange}
        />
      )}
      <button onClick={handleSubmit}>Submit Follow-Up</button>
    </div>
  );
};

export default StudentFollowUpPage;
