// // import { useState, useEffect } from "react";
// // import DummyPage from "./DummyPage";
// // import LogoutButton from "./LogoutButton";
// // import GoogleLoginButton from "./GoogleLoginButton";

// // const HomePage = () => {
// //   const [user, setUser] = useState("");

// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const response = await fetch("http://localhost:3000/auth/user", {
// //           credentials: "include",
// //         });
// //         if (response.ok) {
// //           const userData = await response.json();
// //           console.log("userData", userData);
// //           setUser(userData.firstName);
// //         }
// //       } catch (error) {
// //         console.error("Failed to fetch user", error);
// //       }
// //     };

// //     fetchUser();
// //   }, []);

// //   return (
// //     <div>
// //       {user ? (
// //         <>
// //           <DummyPage user={user} />
// //           <LogoutButton />
// //         </>
// //       ) : (
// //         <>
// //           <GoogleLoginButton redirectUrl="http://localhost:5173" />
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default HomePage;
// import React, { useState, useEffect } from "react";
// import GoogleLoginButton from "./GoogleLoginButton";
// import LogoutButton from "./LogoutButton";
// import DummyPage from "./DummyPage";
// import AdminLogin from "./AdminLogin";

// const HomePage = () => {
//   const [user, setUser] = useState(null);
//   const [showAdminLogin, setShowAdminLogin] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/auth/user", {
//           credentials: "include",
//         });
//         if (response.ok) {
//           const userData = await response.json();
//           setUser(userData);
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleAdminLoginClick = () => {
//     setShowAdminLogin(true);
//   };

//   const handleAdminLoginClose = () => {
//     setShowAdminLogin(false);
//   };

//   return (
//     <div>
//       {user ? (
//         <>
//           <DummyPage user={user} />
//           <LogoutButton />
//         </>
//       ) : (
//         <>
//           <GoogleLoginButton redirectUrl="http://localhost:5173" />
//           <button onClick={handleAdminLoginClick}>Admin Login</button>
//           {showAdminLogin && <AdminLogin onClose={handleAdminLoginClose} />}
//         </>
//       )}
//     </div>
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import LogoutButton from "./LogoutButton";
import DummyPage from "./DummyPage";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/user", {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.firstName);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleAdminLoginClick = () => {
    setShowAdminLogin(true);
  };

  const handleAdminLoginClose = () => {
    setShowAdminLogin(false);
  };

  return (
    <div>
      {user ? (
        <>
          <DummyPage user={user} />
          <LogoutButton />
        </>
      ) : (
        <>
          {!showAdminLogin && (
            <GoogleLoginButton redirectUrl="http://localhost:5173" />
          )}
          <button onClick={handleAdminLoginClick}>Admin Login</button>
          {showAdminLogin && (
            <div className="admin-login-popup">
              <div className="admin-login-content">
                <button
                  onClick={handleAdminLoginClose}
                  className="close-button"
                >
                  X
                </button>
                <GoogleLoginButton
                  redirectUrl="http://localhost:5173"
                  isAdmin={true}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
