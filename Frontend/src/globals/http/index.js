import axios from "axios";

const API = axios.create({
  baseURL: "https://smartcheckmate.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const APIAuthenticated = axios.create({
  baseURL: "https://smartcheckmate.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export { API, APIAuthenticated };
