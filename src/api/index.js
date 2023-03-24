import axios from "axios";

const API = axios.create({ baseURL: "https://dataforge.onrender.com/" });

// File Processing routes
// Get dataset head, i.e., first 5 rows by default
// export const getDatasetHead = (id, file) =>
//   API.post(`/upload-csv/${id}`, file, {
//     headers: { "Content-Type": "text/csv" }, // Choosing appropriate MIME type
//   });

export const getDatasetHead = (id, file) =>
  API.post(
    `/upload-csv/${id}`,
    file
  );

// FI: Auth requests
export const login = (formData) =>
  API.post("/login", formData, {
    headers: { "Content-Type": "application/json" },
  });

export const register = (formData) => {
  console.log("Register API called");
  return API.post("/register", formData, {
    headers: { "Content-Type": "application/json" },
  });
};

// export const signUp = (formData) => API.post("/user/", formData);
