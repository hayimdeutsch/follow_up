// import { useEffect, useState, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const StudentPage = () => {
//   const { studentId } = useParams();
//   const [student, setStudent] = useState(null);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const hasFetched = useRef(false);

//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3000/teachers/students/${studentId}`,
//           {
//             credentials: "include",
//           }
//         );
//         if (response.ok) {
//           const studentData = await response.json();
//           setStudent(studentData.student);
//         } else {
//           if (response.status === 401) {
//             const currentUrl = window.location.href;
//             console.log(
//               "printing current url from Student Page component",
//               currentUrl
//             );
//             navigate(`/login?redirectUrl=${encodeURIComponent(currentUrl)}`);
//           } else {
//             setError("Failed to fetch student");
//           }
//         }
//       } catch (error) {
//         setError("Error: " + error.message);
//       }
//     };

//     if (!hasFetched.current) {
//       fetchStudent();
//       hasFetched.current = true;
//     }
//   }, [studentId, navigate]);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!student) {
//     return <div>Loading...</div>;
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
//         {student.followupEmails.map((followUp, index) => (
//           <li key={index}>{new Date(followUp.scheduledDate).toDateString()}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StudentPage;
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StudentPage = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/teachers/students/${studentId}`,
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const studentData = await response.json();
          setStudent(studentData.student);
        } else {
          if (response.status === 401) {
            const currentUrl = window.location.href;
            console.log(
              "printing current url from Student Page component",
              currentUrl
            );
            navigate(`/login?redirectUrl=${encodeURIComponent(currentUrl)}`);
          } else {
            setError("Failed to fetch student");
          }
        }
      } catch (error) {
        setError("Error: " + error.message);
      }
    };

    if (!hasFetched.current) {
      fetchStudent();
      hasFetched.current = true;
    }
  }, [studentId, navigate]);

  const handleAddQuestionnaire = () => {
    const token = Math.floor(Math.random() * 1000000);
    console.log("New Questionnaire Token:", token);
    // Navigate to the questionnaire page with the token as a query parameter
    navigate(`questionnaire?token=${token}`);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>
        {student.firstName} {student.lastName}
      </h1>
      <p>Email: {student.email}</p>
      <p>Event Date: {new Date(student.eventdate).toDateString()}</p>
      <h2>Follow Up Emails</h2>
      <ul>
        {student.followupEmails.map((followUp, index) => (
          <li key={index}>{new Date(followUp.scheduledDate).toDateString()}</li>
        ))}
      </ul>
      <button onClick={handleAddQuestionnaire}>Add New Questionnaire</button>
    </div>
  );
};

export default StudentPage;
