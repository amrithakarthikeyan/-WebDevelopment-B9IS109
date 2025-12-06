import axios from "axios";

export const api = axios.create({
  baseURL: "/api", // Vite proxy will send this to http://localhost:4000/api
  timeout: 10000,
});
