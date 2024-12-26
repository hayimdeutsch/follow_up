import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentPage = () => {
  const { workerId, customerId } = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch("/api/check-auth")
      .then((response) => response.json())
      .then((data) => {
        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          window.location.href = `/auth/google?returnTo=${window.location.pathname}`;
        }
      });
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <div>
          <h1>
            Customer Page for Worker {workerId} and Customer {customerId}
          </h1>
          {/* Display customer details here */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default StudentPage;
