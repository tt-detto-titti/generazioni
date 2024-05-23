import axios from "axios";

export default axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://generazioni.onrender.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
