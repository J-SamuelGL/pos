import axios from "axios";

const dev = "http://localhost:3000/api";
const API = axios.create({
  baseURL: dev,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default API;
