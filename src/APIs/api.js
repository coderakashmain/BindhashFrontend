import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? import.meta.env.VITE_BASE_URL
      : "http://localhost:3000", 
  withCredentials: true, 
});

// Request interceptor
api.interceptors.request.use(
  (config) => {

    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting...");
      window.location.href = '/login'
    }
    return Promise.reject(error);
  }
);

export default api;
