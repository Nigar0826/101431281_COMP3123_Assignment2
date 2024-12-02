import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1/user', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => Promise.reject(error) 
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response) {
      // Handle specific HTTP errors
      if (error.response.status === 401) {
        // Unauthorized error, redirect to login if needed
        localStorage.removeItem('token');
        window.location.href = '/login'; 
      } else if (error.response.status === 403) {
        alert('Access denied. You do not have permission to access this resource.');
      } else if (error.response.status === 500) {
        alert('Server error. Please try again later.');
      }
    } else if (error.request) {
      // Handle network errors
      console.error('Network error:', error.message);
      alert('Network error. Please check your connection and try again.');
    } else {
      // Handle other errors
      console.error('Error:', error.message);
      alert('An error occurred. Please try again.');
    }
    return Promise.reject(error);
  }
);

export default api;
