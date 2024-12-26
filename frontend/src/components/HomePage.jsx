import { useState, useEffect } from "react";
import DummyPage from "./DummyPage";
import LogoutButton from "./LogoutButton";
import GoogleLoginButton from "./GoogleLoginButton";
import AddStudentForm from "./AddStudentForm";

const HomePage = () => {
  const [user, setUser] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/user", {
          credentials: "include", // Include cookies in the request
        });
        if (response.ok) {
          const userData = await response.json();
          console.log("userData", userData);
          setUser(userData.firstName);
          setUserID(userData.googleId);
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <DummyPage user={user} />
          <AddStudentForm teacher={user} />
          <LogoutButton />
        </>
      ) : (
        <>
          <GoogleLoginButton redirectUrl="http://localhost:5173" />
        </>
      )}
    </div>
  );
};

export default HomePage;
