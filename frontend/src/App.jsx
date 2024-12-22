import "./App.css";

function App() {
  const handleGoogleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="card">
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </div>
    </>
  );
}

export default App;
