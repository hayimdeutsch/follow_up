import { useState, useEffect } from "react";
import DummyPage from "./DummyPage";
import LogoutButton from "./LogoutButton";
import GoogleLoginButton from "./GoogleLoginButton";

const HomePage = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/user", {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          console.log("userData", userData);
          setUser(userData.firstName);
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
