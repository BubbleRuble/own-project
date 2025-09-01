import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

export const api = axios.create({
  baseURL: BASE_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

export const addMovies = async (movie) => {
  try {
    const { data } = await api.post(BASE_URL, movie)
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMovies = async () => {
  try {
    const { data } = await api.get(`${BASE_URL}/api/movies`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
