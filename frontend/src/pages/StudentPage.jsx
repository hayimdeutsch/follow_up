// import React, { useRef, useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import generateToken from "../utils/generateToken.js";
// import useAuthenticatedFetch from "../hooks/useAuthenticatedFetch.js";

// const StudentPage = () => {
//   const { studentId } = useParams();
//   const navigate = useNavigate();
//   const token = useRef(generateToken());
//   const [fetchTrigger, setFetchTrigger] = useState(false);
//   const {
//     data: student,
//     error,
//     loading,
//   } = useAuthenticatedFetch(
//     `http://localhost:3000/teachers/students/${studentId}`,
//     { trigger: fetchTrigger }
//   );
//   const [scheduledEmails, setScheduledEmails] = useState([]);
//   const [newEmailDate, setNewEmailDate] = useState("");

//   useEffect(() => {
//     if (student) {
//       setScheduledEmails(student.scheduledEmails || []);
//     }
//   }, [student]);

//   const handleAddEmail = async () => {
//     const updatedEmails = [...scheduledEmails, { scheduledDate: newEmailDate }];
//     setScheduledEmails(updatedEmails);
//     await updateScheduledEmails(updatedEmails);
//     setFetchTrigger(!fetchTrigger);
//   };

//   const handleRemoveEmail = async (index) => {
//     const updatedEmails = scheduledEmails.filter((_, i) => i !== index);
//     setScheduledEmails(updatedEmails);
//     await updateScheduledEmails(updatedEmails);
//   };

//   const updateScheduledEmails = async (emails) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/teachers/students/${studentId}/emails`,
//         {
//           method: "PUT",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ scheduledEmails: emails }),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to update scheduled emails");
//       }
//     } catch (error) {
//       console.error("Error updating scheduled emails:", error);
//     }
//   };

//   const handleNavigate = (options) => {
//     navigate(`/students/${studentId}/followup?token=${token.current}`, {
//       state: { options, student },
//     });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div>
//       <h1>
//         {student.firstName} {student.lastName}
//       </h1>
//       <p>Email: {student.email}</p>
//       <p>Event Date: {new Date(student.eventdate).toDateString()}</p>
//       <h2>Follow Up Emails</h2>
//       <ul>
//         {scheduledEmails.map((followUp, index) => (
//           <li key={index}>
//             {new Date(followUp.scheduledDate).toDateString()}
//             <button onClick={() => handleRemoveEmail(index)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//       <input
//         type="date"
//         value={newEmailDate}
//         onChange={(e) => setNewEmailDate(e.target.value)}
//       />
//       <button onClick={handleAddEmail}>Add Email</button>
//       <h2>Follow Up Objects</h2>
//       {
//         <ul>
//           {student.followUp.map((followUp, index) => (
//             <li key={index}>
//               {followUp.title}
//               <Link to={`/teacher/followup/${followUp.token}`}>
//                 View Follow-Up
//               </Link>
//             </li>
//           ))}
//         </ul>
//       }

//       <button onClick={() => handleNavigate({ sendQuestionnaire: true })}>
//         Send Questionnaire
//       </button>
//       <button onClick={() => handleNavigate({ scheduleMeeting: true })}>
//         Schedule Meeting
//       </button>
//       <button onClick={() => navigate("/")}>Back to Dashboard</button>
//     </div>
//   );
// };

// export default StudentPage;

import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import generateToken from "../utils/generateToken.js";
import useAuthenticatedFetch from "../hooks/useAuthenticatedFetch.js";
import ScheduledEmails from "../components/ScheduledEmails";
import FollowUpList from "../components/FollowUpList";

const StudentPage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const token = useRef(generateToken());
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const {
    data: student,
    error,
    loading,
  } = useAuthenticatedFetch(
    `http://localhost:3000/teachers/students/${studentId}`,
    { trigger: fetchTrigger }
  );

  const handleEmailsChange = (updatedEmails) => {
    setFetchTrigger(!fetchTrigger);
  };

  const handleNavigate = (options) => {
    navigate(`/students/${studentId}/followup?token=${token.current}`, {
      state: { options, student },
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>
        {student.firstName} {student.lastName}
      </h1>
      <p>Email: {student.email}</p>
      <p>Event Date: {new Date(student.eventdate).toDateString()}</p>
      <ScheduledEmails
        studentId={studentId}
        initialEmails={student.scheduledEmails || []}
        onEmailsChange={handleEmailsChange}
      />
      <FollowUpList followUpItems={student.followUp || []} />
      <button onClick={() => handleNavigate({ sendQuestionnaire: true })}>
        Send Questionnaire
      </button>
      <button onClick={() => handleNavigate({ scheduleMeeting: true })}>
        Schedule Meeting
      </button>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
};

export default StudentPage;
