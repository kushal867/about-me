import axios from 'axios';

// Get API URL from environment variables
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Important for CORS with credentials
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// ==================== API ENDPOINTS ====================

// Projects
export const getProjects = (params = {}) => api.get('/projects/', { params });
export const getFeaturedProjects = () => api.get('/projects/featured/');
export const getProjectById = (id) => api.get(`/projects/${id}/`);

// Statistics
export const getStatistics = () => api.get('/statistics/');

// Experience
export const getExperience = () => api.get('/experience/');

// Contact
export const sendContactMessage = (data) => api.post('/contact/', data);

export default api;