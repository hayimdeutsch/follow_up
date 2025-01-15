import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddStudentForm from "./AddStudentForm";

const TeacherDashboard = ({ user }) => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/teachers/students`,
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const studentsData = await response.json();
          setStudents(studentsData.students);
        } else {
          setError("Failed to fetch students");
        }
      } catch (error) {
        setError("Error: " + error.message);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Welcome, {user}!</h1>
      <p>You are successfully signed in!</p>
      <AddStudentForm teacher={user} />
      <h2>Students</h2>
      {error && <div>{error}</div>}
      <ul>
        {students.map((student) => {
          const { _id: studentId, firstName, lastName, email } = student;
          return (
            <li key={studentId}>
              <Link to={`/students/${studentId}`}>
                {firstName} {lastName} {email}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TeacherDashboard;
