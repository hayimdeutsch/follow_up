import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const StudentQuestionnaire = () => {
  const { token } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/questionnaires/${token}`,
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setQuestionnaire(data);
        } else {
          setError("Failed to fetch questionnaire");
        }
      } catch (error) {
        setError("Error fetching questionnaire: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionnaire();
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
      const response = await fetch(
        `http://localhost:3000/questionnaires/${token}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(questionnaire),
        }
      );
      if (response.ok) {
        alert("Questionnaire submitted successfully!");
      } else {
        alert("Failed to submit questionnaire");
      }
    } catch (error) {
      console.error("Error submitting questionnaire:", error);
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
      <h1>{questionnaire.title}</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentQuestionnaire;
