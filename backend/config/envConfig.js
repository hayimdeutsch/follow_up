import "dotenv/config";

const config =
  process.env.NODE_ENV === "production"
    ? {
        frontendUrl: process.env.FRONTEND_URL,
        backendUrl: process.env.BACKEND_URL,
      }
    : {
        frontendUrl: "http://localhost:5173",
        backendUrl: "http://localhost:3000/api/v1",
      };

export default config;
