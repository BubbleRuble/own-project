import { api } from '../config/index';

export const registerUser = async (user) => {
  try {
    const { data } = await api.post(`/api/auth/register`, user);
    return data;
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};

export const loginUser = async (credentials) => {
  try {
     const { data } = await api.post(`/api/auth/login`, credentials);
     return data
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

