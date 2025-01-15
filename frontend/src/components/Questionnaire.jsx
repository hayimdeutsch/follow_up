import React from "react";

const Questionnaire = ({ questionnaire, onAnswerChange }) => {
  const handleAnswerChange = (index, answer) => {
    const updatedQuestions = [...questionnaire.questions];
    if (updatedQuestions[index].hasRange) {
      updatedQuestions[index].range.studentAnswer = answer;
    } else if (updatedQuestions[index].hasSentence) {
      updatedQuestions[index].sentenceAnswer = answer;
    }
    onAnswerChange(updatedQuestions);
  };

  return (
    <div>
      <h2>{questionnaire.title}</h2>
      {questionnaire.questions.map((question, index) => (
        <div key={index}>
          <p>{question.question}</p>
          {question.hasRange && (
            <input
              type="number"
              min={question.range.min}
              max={question.range.max}
              value={question.range.studentAnswer || ""}
              onChange={(e) =>
                handleAnswerChange(index, Number(e.target.value))
              }
            />
          )}
          {question.hasSentence && (
            <textarea
              value={question.sentenceAnswer || ""}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Questionnaire;
