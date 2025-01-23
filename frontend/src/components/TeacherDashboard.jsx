import { Link } from "react-router-dom";
import useAuthenticatedFetch from "../hooks/useFetch";
import AddStudentForm from "./AddStudentForm";

const TeacherDashboard = ({ user }) => {
  const { data: students, error, loading } = useAuthenticatedFetch("/students");

  return (
    <div>
      <h1>Welcome, {user}!</h1>
      <p>You are successfully signed in!</p>
      <AddStudentForm teacher={user} />
      <h2>Students</h2>
      {error && <div>{error}</div>}
      <ul>
        {students &&
          students.map((student) => {
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
