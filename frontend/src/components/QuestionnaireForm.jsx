import React, { useState, useEffect } from "react";
import Question from "./Question";
import QuestionForm from "./QuestionForm";
import { backendUrl } from "../config/config.js";
import useAuthenticatedFetch from "../hooks/useFetch.js";

const QuestionnaireForm = ({ onQuestionnaireChange }) => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const {
    data: templates,
    error,
    loading,
  } = useAuthenticatedFetch("/templates");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  useEffect(() => {
    if (selectedTemplate) {
      fetch(`${backendUrl}/templates/${selectedTemplate}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((questions) => {
          setQuestions(questions);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        });
    }
  }, [selectedTemplate]);

  useEffect(() => {
    onQuestionnaireChange({ title, questions });
  }, [questions, title, onQuestionnaireChange]);

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter questionnaire title"
      />
      <select
        value={selectedTemplate}
        onChange={(e) => setSelectedTemplate(e.target.value)}
      >
        <option value="">Select a Template</option>
        {templates &&
          templates.map((template, index) => (
            <option key={index} value={template.id}>
              {template.title}
            </option>
          ))}
      </select>
      <ul>
        {questions &&
          questions.map((question, index) => (
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
