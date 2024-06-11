import axios from 'axios';

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://generazioni.onrender.com/apiv2',
  headers: {
    'Content-type': 'application/json'
  }
});
