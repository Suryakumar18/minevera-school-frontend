// config/api.js
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://minerva-backed-3.onrender.com' 
  : 'https://minerva-backed-3.onrender.com';

export default API_URL;
