import {api} from '../config/index'


export const addMovies = async (movie) => {
  try {
    const { data } = await api.post(`/api/movies`, movie)
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMovies = async (query) => {
  try {
    const { data } = await api.get(`/api/movies?search=${query} `);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const handleMovieClick = async (movieId) => {
  try {
    return await api.get(`/api/movies/${movieId}`);
  } catch (error) {
    console.error('Помилка при завантаженні деталей фільму:', error);
  }
};
