import axios from "axios";

// export const API = axios.create({ baseURL: "https://dataforge.onrender.com/" });
export const API = axios.create({
  baseURL: "http://127.0.0.1:5174/json",
  // baseURL: "http://127.0.0.1:8000/",
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin' : '*',
    // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
});

// File Processing routes
// Get dataset head, i.e., first 5 rows by default
// export const getDatasetHead = (id, file) =>
//   API.post(`/upload-csv/${id}`, file, {
//     headers: { "Content-Type": "text/csv" }, // Choosing appropriate MIME type
//   });

// executes before every request
// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("User")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("User")).token
//     }`;
//   }
//   console.log("Logging interceptor's populated header");
//   console.log(req.headers.Authorization);
//   return req;
// });

// Auth requests
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

export const getDatasetHead = (id, file) => API.post(`/upload-csv/${id}`, file);

export const get_cols_info = (id) => {
  console.log("get_csv_column_info API called");
  return API.get(`/get_csv_column_info/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
};

export const get_pipeline_history = (id) => {
  return API.get(`/get-pipeline/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
};
