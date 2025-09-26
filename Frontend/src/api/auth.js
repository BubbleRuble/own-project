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

export const currentUser = async () => {
  try {
    const { data } = await api.get('/api/auth/current');
    return data;
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
}


