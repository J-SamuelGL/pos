import axios from "axios";

const prod =
  "https://backend.redground-8db0c454.eastus2.azurecontainerapps.io/api";

const dev = "http://localhost:3000/api";
const API = axios.create({
  baseURL: prod,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default API;
