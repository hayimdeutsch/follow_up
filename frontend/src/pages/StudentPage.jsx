import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import generateToken from "../utils/generateToken";

const StudentPage = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const hasFetched = useRef(false);
  const token = useRef(generateToken());
  const location = useLocation();

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
            const currentUrl = location.href;
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

  const handleNavigate = (options) => {
    navigate(`/students/${studentId}/followup?token=${token.current}`, {
      state: { options, student },
    });
  };

  return (
    <div>
      <h1>
        {student?.firstName} {student?.lastName}
      </h1>
      <p>Email: {student?.email}</p>
      <p>Event Date: {new Date(student?.eventdate).toDateString()}</p>
      <h2>Follow Up Emails</h2>
      <ul>
        {student?.followupEmails.map((followUp, index) => (
          <li key={index}>{new Date(followUp.scheduledDate).toDateString()}</li>
        ))}
      </ul>
      <button onClick={() => handleNavigate({ sendQuestionnaire: true })}>
        Send Questionnaire
      </button>
      <button onClick={() => handleNavigate({ scheduleMeeting: true })}>
        Schedule Meeting
      </button>
    </div>
  );
};

export default StudentPage;
