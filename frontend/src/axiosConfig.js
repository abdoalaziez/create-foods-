import axios from 'axios';
// process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : '/';
axios.defaults.baseURL =
process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : '/';

// https://update-backend-foods-2.onrender.com