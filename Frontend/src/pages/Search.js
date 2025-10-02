import { getMovies } from '../api/movies';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { SearchIcon } from '../components/SearchBox.styled';
import '../styles/index.css';
import { api } from '../config';

const SearchMovies = () => {
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

  const handleMovieClick = async movieId => {
    try {
      const data = await api.get(`/api/movies/${movieId}`);
      setSelectedMovie(data);

      navigate(`/movies/${movieId}`);
    } catch (error) {
      console.error('Помилка при завантаженні деталей фільму:', error);
    }
  };

  return (
    <>
      <div className="search-container">
        <h1>Search Movies</h1>
        <SearchIcon className="searchicon" />
        <div className="input-container">
          <label>
            <input
              type="text"
              placeholder="type your title"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div >
        {movies.length > 0 ? (
          movies.map(movie => (
            <li
              key={movie._id}
              className="search-result"
              onClick={() => handleMovieClick(movie._id)}
            >
              {movie.title}
            </li>
          ))
        ) : (
          <p>Фільм не знайдено</p>
        )}
      </div>
    </>
  );
};

export default SearchMovies;
