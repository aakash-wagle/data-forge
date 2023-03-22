import axios from "axios";

const API = axios.create({ baseURL: "https://dataforge.onrender.com/" });

// export const fetchPosts = () => API.get("/posts");
// export const createPost = (newPost) => API.post("/posts", newPost);
// export const updatePost = (id, updatedPost) =>
//   API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);
// export const likePost = (id, updatedPost) =>
//   API.patch(`/posts/${id}/like`, updatedPost);

// FI: Auth requests
export const login = (formData) =>
  API.post("/login", formData, {
    headers: { "Content-Type": "application/json" },
  });

export const register = (formData) =>{
  console.log("Register API called");
  return API.post("/register", formData, {
    headers: { "Content-Type": "application/json" },
  })};

// export const signUp = (formData) => API.post("/user/", formData);
