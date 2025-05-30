import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;


export const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar token a cada solicitud
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
