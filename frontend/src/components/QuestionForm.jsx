import React, { useState } from "react";

const QuestionForm = ({ handleAddQuestion }) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [hasRange, setHasRange] = useState(false);
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    const question = {
      question: newQuestion,
      hasRange,
      minRange: hasRange ? minRange : null,
      maxRange: hasRange ? maxRange : null,
      hasSentence: !hasRange,
    };
    handleAddQuestion(question);
    setNewQuestion("");
    setHasRange(false);
    setMinRange(0);
    setMaxRange(10);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        placeholder="New Question"
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={hasRange}
            onChange={(e) => setHasRange(e.target.checked)}
          />
          Has Range
        </label>
        {hasRange && (
          <div>
            <input
              type="number"
              value={minRange}
              onChange={(e) => setMinRange(e.target.value)}
              placeholder="Min Range"
            />
            <input
              type="number"
              value={maxRange}
              onChange={(e) => setMaxRange(e.target.value)}
              placeholder="Max Range"
            />
          </div>
        )}
      </div>
      <button type="submit">Add Question</button>
    </form>
  );
};

export default QuestionForm;
