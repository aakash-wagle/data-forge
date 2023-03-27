import axios from "axios";

export const API = axios.create({ baseURL: "https://dataforge.onrender.com/" });

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

export const get_cols_info = (id) =>{
  console.log("get_csv_column_info API called");
  return API.get(`/get_csv_column_info/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
}
