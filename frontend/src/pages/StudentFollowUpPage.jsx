import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const StudentFollowUpPage = () => {
  const { token } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowUp = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/followup/${token}`,
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setQuestionnaire(data.questionnaire);
          setMeetingDetails(data.meetingDetails);
        } else {
          setError("Failed to fetch follow-up details");
        }
      } catch (error) {
        setError("Error fetching follow-up details: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowUp();
  }, [token]);

  const handleInputChange = (index, field, value) => {
    const updatedQuestions = [...questionnaire.questions];
    if (field === "range") {
      updatedQuestions[index].range.studentAnswer = value;
    } else {
      updatedQuestions[index].sentenceAnswer = value;
    }
    setQuestionnaire({ ...questionnaire, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/followup/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ questionnaire, meetingDetails }),
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Follow-Up</h1>
      <form onSubmit={handleSubmit}>
        {questionnaire && (
          <>
            <h2>{questionnaire.title}</h2>
            {questionnaire.questions.map((question, index) => (
              <div key={index}>
                <p>{question.question}</p>
                {question.hasRange ? (
                  <div>
                    <label>
                      Range ({question.range.min} - {question.range.max}):
                      <input
                        type="number"
                        min={question.range.min}
                        max={question.range.max}
                        value={question.range.studentAnswer || ""}
                        onChange={(e) =>
                          handleInputChange(index, "range", e.target.value)
                        }
                        required
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <label>
                      Answer:
                      <input
                        type="text"
                        value={question.sentenceAnswer || ""}
                        onChange={(e) =>
                          handleInputChange(index, "sentence", e.target.value)
                        }
                        required
                      />
                    </label>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
        {meetingDetails && (
          <div>
            <h2>Schedule Meeting</h2>
            <label>
              Select a time:
              <input
                type="datetime-local"
                value={meetingDetails.scheduledTime || ""}
                onChange={(e) =>
                  setMeetingDetails({
                    ...meetingDetails,
                    scheduledTime: e.target.value,
                  })
                }
                required
              />
            </label>
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentFollowUpPage;
