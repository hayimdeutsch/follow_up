import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuthenticatedFetch from "../hooks/useAuthenticatedFetch.js";

const TeacherFollowUpView = () => {
  const { token } = useParams();
  const {
    data: followUp,
    error,
    loading,
  } = useAuthenticatedFetch(`http://localhost:3000/followups/${token}`);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Follow-Up Details</h1>
      {followUp.questionnaire && (
        <div>
          <h2>Questionnaire: {followUp.questionnaire.title}</h2>
          {followUp.questionnaire.questions.map((question, index) => (
            <div key={index}>
              <p>{question.question}</p>
              {question.hasRange && (
                <p>Answer: {question.range.studentAnswer}</p>
              )}
              {question.hasSentence && <p>Answer: {question.sentenceAnswer}</p>}
            </div>
          ))}
        </div>
      )}
      {followUp.meeting && (
        <div>
          <h2>Meeting: {followUp.meeting.topic}</h2>
          <p>Duration: {followUp.meeting.duration} minutes</p>
          <p>
            Selected Time Slot:{" "}
            {new Date(
              followUp.meeting.selectedTimeSlot.startTime
            ).toLocaleString()}{" "}
            -{" "}
            {new Date(
              followUp.meeting.selectedTimeSlot.endTime
            ).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default TeacherFollowUpView;
