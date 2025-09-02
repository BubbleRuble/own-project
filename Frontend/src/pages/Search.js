import { NavLink } from 'react-router-dom';
import MovieItem from '../components/MovieItem';
import { addMovies, getMovies, handleMovieClick } from '../api/movies';
import { useState, useEffect} from 'react';
import { useNavigate } from "react-router";

import Router from 'react-router-dom';
import '../styles/getMovie.css';
import { api } from '../config';


const SearchMovies = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies('');
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setMovies([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const data = await getMovies(searchTerm);
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);


  const handleMovieClick = async (movieId) => {
    try {
      const data = await api.get(`/api/movies/${movieId}`);
      setSelectedMovie(data);

      navigate(`/movies/${movieId}`)
    } catch (error) {
      console.error('Помилка при завантаженні деталей фільму:', error);
    }
  };

  return (
    <>
      {selectedMovie ? (
        <div className="movie-details">
          <button onClick={() => setSelectedMovie(null)}>Назад</button>
          <h2>{selectedMovie.title}</h2>
          <p>Author: {selectedMovie.author}</p>
          <p>Genre: {selectedMovie.genre}</p>
          <p>Date:{selectedMovie.date}</p>
          <p>Rating: {selectedMovie.rating}</p>
        </div>
      ) : (
        <>
          <h1>Search Movies</h1>
          <input
            type="text"
            placeholder="type your title"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className="movie-list">
            {movies.length > 0 ? (
              movies.map(movie => (
                <li key={movie._id} 
                className='movie-item'
                onClick={() => handleMovieClick(movie._id)}>
                  {movie.title}
                </li>
              ))
            ) : (
              <p>Фільм не знайдено</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SearchMovies;
