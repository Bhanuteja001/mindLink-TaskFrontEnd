// src/authService.js
import axios from 'axios';

export const login = async (email, password) => {
  const response = await axios.post('https://mindlink-taskbackend.onrender.com/auth/login', { email:email, password:password });
  return response.data;
};

export const signup = async (email, password) => {
  const response = await axios.post('https://mindlink-taskbackend.onrender.com/auth/signup', { email:email, password:password });
  return response.data;
};
