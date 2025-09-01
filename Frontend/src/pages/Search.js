import { NavLink } from 'react-router-dom';
import MovieList from '../components/MovieList';
import { addMovies, getMovies } from '../api/movies';
import { useState, useEffect } from 'react';

const SearchMovies = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [searchSelected, setSearchSelected] = useState(null);

  useEffect(() => {
    let timerId = setTimeout(async () => {
      try {
        const data = await getMovies();
        setSearchMovies(data);
      } catch (error) {
        console.log(error);
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, []);

  const filteredMovies = movies.filter(movie => {
    movie.title.toLowerCase().includes(query.toLowerCase());
  });


  const handleSelect = movie => {
    setSearchSelected(movie);
    setQuery(movie.title);
  };

  return (
    <>
      <h1>Search Movies</h1>
      <input
        type="text"
        placeholder="type your title"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <div>
        {query && !searchSelected && (
          <ul>
            {filteredMovies.map(movie => (
              <li key={movie.title} onClick={() => handleSelect(movie)}>
                {movie.title}
              </li>
            ))}
          </ul>
        )}

        <div>
          {searchSelected ? (
            <div>
              <h2>{searchSelected.title}</h2>
              <p>Author: {searchSelected.author}</p>
              <p>Genre: {searchSelected.genre}</p>
              <p>Date:{searchSelected.date}</p>
              <p>{searchSelected.favorite}</p>
            </div>
          ) : (
            query && <MovieList movies={filteredMovies} />
          )}
        </div>
      </div>
    </>
  );
};

export default SearchMovies;
