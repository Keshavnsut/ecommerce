import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // keep this if you're dealing with cookies/sessions
});

export default api;
