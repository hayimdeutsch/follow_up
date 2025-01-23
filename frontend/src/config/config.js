import axios from "axios";

const backendUrl = "http://localhost:3000/api/v1";
const frontendUrl = "http://localhost:5173";

const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const privateAxios = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export { backendUrl, frontendUrl, api, privateAxios };
