import axios from "axios";

export default axios.create({
  // TODO cambiare sta cosa poco elegante
  baseURL: "https://generazioni.onrender.com/api",
  // baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});
