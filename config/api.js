// config/api.js
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://minerva-backed-3.onrender.com'  // Your Render URL
  : 'http://localhost:5000';                   // Local development

export default API_URL;
