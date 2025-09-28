import axios from "axios";

const API = axios.create({
  baseURL: "https://smartcheckmate.onrender.com/api",
  // baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const APIAuthenticated = axios.create({
  baseURL: "https://smartcheckmate.onrender.com/api",
  // baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `${localStorage.getItem("token")}`,
  },
});
// console.log("token", `${localStorage.getItem("token")}`);

export { API, APIAuthenticated };
