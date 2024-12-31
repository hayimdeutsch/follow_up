// import React, { useState } from "react";

// const GoogleLoginButton = ({ redirectUrl }) => {
//   const [gmail, setGmail] = useState("");
//   const [error, setError] = useState("");

//   const loginUrl = `http://localhost:3000/auth/google?returnTo=${encodeURIComponent(
//     redirectUrl
//   )}`;

//   const handleGoogleLogin = async () => {
//     if (!gmail) {
//       setError("Please enter your email");
//       return;
//     }
//     try {
//       const response = await fetch(
//         "http://localhost:3000/auth/check-approval",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ gmail }),
//         }
//       );
//       if (response.ok) {
//         window.location.href = loginUrl;
//       } else {
//         setError("Account not yet approved");
//         console.error("Login failed, your account is not approved");
//       }
//     } catch (error) {
//       setError("Login failed");
//       console.error("Error:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setGmail(e.target.value);
//     setError("");
//   };

//   return (
//     <div>
//       {error && <div style={{ color: "red" }}>{error}</div>}
//       <label htmlFor="email">Email:</label>
//       <input
//         type="email"
//         value={gmail}
//         onChange={handleChange}
//         placeholder="Enter your email"
//       />
//       <button onClick={handleGoogleLogin}>Log in with Google</button>
//     </div>
//   );
// };

// export default GoogleLoginButton;

import React, { useState } from "react";

const GoogleLoginButton = ({ redirectUrl, isAdmin }) => {
  const [gmail, setGmail] = useState("");
  const [error, setError] = useState("");

  const loginUrl = `http://localhost:3000/auth/google?returnTo=${encodeURIComponent(
    redirectUrl
  )}`;

  const handleGoogleLogin = async () => {
    if (!gmail) {
      setError("Please enter your email");
      return;
    }
    try {
      const checkUrl = isAdmin
        ? "http://localhost:3000/admin/check-admin"
        : "http://localhost:3000/auth/check-approval";
      const response = await fetch(checkUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gmail }),
      });
      if (response.ok) {
        window.location.href = loginUrl;
      } else {
        setError(
          isAdmin ? "Admin account not approved" : "Account not yet approved"
        );
        console.error("Login failed, your account is not approved");
      }
    } catch (error) {
      setError("Login failed");
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setGmail(e.target.value);
    setError("");
  };

  return (
    <div>
      <input
        type="email"
        value={gmail}
        onChange={handleChange}
        placeholder="Enter your email"
      />
      <button onClick={handleGoogleLogin}>
        {isAdmin ? "Admin Login with Google" : "Login with Google"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default GoogleLoginButton;
