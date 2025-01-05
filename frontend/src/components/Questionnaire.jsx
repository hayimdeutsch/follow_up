// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const Questionnaire = () => {
//   const { studentID } = useParams();
//   const [title, setTitle] = useState("");
//   const [questions, setQuestions] = useState([]);
//   const [newQuestion, setNewQuestion] = useState("");
//   const [hasRange, setHasRange] = useState(false);
//   const [minRange, setMinRange] = useState(0);
//   const [maxRange, setMaxRange] = useState(10);
//   const [templates, setTemplates] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:3000/templates", {
//       credentials: "include",
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setTemplates(data.templates);
//       })
//       .catch((error) => {
//         console.error("Error fetching templates:", error);
//         setTemplates([]);
//       });
//   }, []);

//   useEffect(() => {
//     if (selectedTemplate) {
//       // Fetch questions for the selected template
//       fetch(`http://localhost:3000/templates/${selectedTemplate}`, {
//         credentials: "include",
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Failed to fetch questions");
//           }
//           return response.json();
//         })
//         .then((data) => {
//           setQuestions(data.questions);
//         })
//         .catch((error) => {
//           console.error("Error fetching questions:", error);
//         });
//     }
//   }, [selectedTemplate]);

//   const handleAddQuestion = () => {
//     const question = {
//       question: newQuestion,
//       hasRange,
//       minRange: hasRange ? minRange : null,
//       maxRange: hasRange ? maxRange : null,
//       hasSentence: !hasRange,
//     };
//     setQuestions([...questions, question]);
//     setNewQuestion("");
//     setHasRange(false);
//     setMinRange(0);
//     setMaxRange(10);
//   };

//   const handleDeleteQuestion = (index) => {
//     const updatedQuestions = questions.filter((_, i) => i !== index);
//     setQuestions(updatedQuestions);
//   };

//   const handleSaveQuestionnaire = () => {
//     const questionnaire = {
//       title,
//       questions,
//       studentID,
//     };

//     // Save the questionnaire to the backend
//     fetch("http://localhost:3000/teachers/questionnaires", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify(questionnaire),
//     })
//       .then((response) => {
//         if (response.ok) {
//           alert("Questionnaire saved successfully!");
//         } else {
//           alert("Failed to save questionnaire");
//         }
//       })
//       .catch((error) => {
//         console.error("Error saving questionnaire:", error);
//       });
//   };

//   return (
//     <div>
//       <h1>Create Questionnaire for Student {studentID}</h1>
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Questionnaire Title"
//       />
//       <select
//         value={selectedTemplate}
//         onChange={(e) => setSelectedTemplate(e.target.value)}
//       >
//         <option value="">Select a Template</option>
//         {templates.map((template) => (
//           <option key={template.id} value={template.id}>
//             {template.title}
//           </option>
//         ))}
//       </select>
//       <ul>
//         {questions.map((question, index) => (
//           <li key={index}>
//             {JSON.stringify(question)}
//             <button onClick={() => handleDeleteQuestion(index)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//       <input
//         type="text"
//         value={newQuestion}
//         onChange={(e) => setNewQuestion(e.target.value)}
//         placeholder="New Question"
//       />
//       <div>
//         <label>
//           <input
//             type="checkbox"
//             checked={hasRange}
//             onChange={(e) => setHasRange(e.target.checked)}
//           />
//           Has Range
//         </label>
//         {hasRange && (
//           <div>
//             <input
//               type="number"
//               value={minRange}
//               onChange={(e) => setMinRange(e.target.value)}
//               placeholder="Min Range"
//             />
//             <input
//               type="number"
//               value={maxRange}
//               onChange={(e) => setMaxRange(e.target.value)}
//               placeholder="Max Range"
//             />
//           </div>
//         )}
//       </div>
//       <button onClick={handleAddQuestion}>Add Question</button>
//       <button onClick={handleSaveQuestionnaire}>Save Questionnaire</button>
//     </div>
//   );
// };

// export default Questionnaire;

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Question from "./Question";
import QuestionForm from "./QuestionForm";
import TemplateSelector from "./TemplateSelector";

const Questionnaire = () => {
  const { studentId } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  useEffect(() => {
    setTitle(`Questionnaire for Student ${studentId}`);
    fetch("http://localhost:3000/templates", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch templates");
        }
        return response.json();
      })
      .then((data) => {
        setTemplates(data.templates);
      })
      .catch((error) => {
        console.error("Error fetching templates:", error);
        setTemplates([]);
      });
  }, []);

  useEffect(() => {
    if (selectedTemplate) {
      fetch(`http://localhost:3000/templates/${selectedTemplate}`, {
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch questions");
          }
          return response.json();
        })
        .then((data) => {
          setQuestions([...questions, ...data.questions]);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        });
    }
  }, [selectedTemplate]);

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSaveQuestionnaire = () => {
    const questionnaire = {
      questions,
      token,
      title,
    };

    // Save the questionnaire to the backend
    fetch(`http://localhost:3000/questionnaires/${studentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(questionnaire),
    })
      .then((response) => {
        if (response.ok) {
          alert("Questionnaire saved successfully!");
        } else {
          alert("Failed to save questionnaire");
        }
      })
      .catch((error) => {
        console.error("Error saving questionnaire:", error);
      });
  };

  return (
    <div>
      <h1>Create Questionnaire for Student {studentId}</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Questionnaire Title"
      />
      <TemplateSelector
        templates={templates}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
      />
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
      <button onClick={handleSaveQuestionnaire}>Save Questionnaire</button>
    </div>
  );
};

export default Questionnaire;
