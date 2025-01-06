import React, { useState, useEffect } from "react";
import Question from "./Question";
import QuestionForm from "./QuestionForm";

const QuestionnaireForm = ({ onQuestionnaireChange }) => {
  const [questions, setQuestions] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  useEffect(() => {
    // Fetch templates when the component is rendered
    fetch("http://localhost:3000/templates", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setTemplates(data.templates);
      })
      .catch((error) => {
        console.error("Error fetching templates:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedTemplate) {
      fetch(`http://localhost:3000/templates/${selectedTemplate}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data.questions);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        });
    }
  }, [selectedTemplate]);

  useEffect(() => {
    onQuestionnaireChange(questions);
  }, [questions, onQuestionnaireChange]);

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <select
        value={selectedTemplate}
        onChange={(e) => setSelectedTemplate(e.target.value)}
      >
        <option value="">Select a Template</option>
        {templates.map((template, index) => (
          <option key={index} value={template.id}>
            {template.title}
          </option>
        ))}
      </select>
      <ul>
        {questions.map((question, index) => (
          <Question
            key={index}
            question={question}
            index={index}
            handleDeleteQuestion={handleDeleteQuestion}
          />
        ))}
      </ul>
      <QuestionForm handleAddQuestion={handleAddQuestion} />
    </div>
  );
};

export default QuestionnaireForm;
