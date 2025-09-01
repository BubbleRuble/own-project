import { NavLink } from 'react-router-dom';
import MovieList from '../components/MovieList';
import { getMovies } from '../api/movies';
import { useState, useEffect } from 'react';

const SearchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getMovies()
      .then(setMovies)
      .catch(error => console.log(error));
  }, []);

  const filteredMovies = movies.filter(movie => {
    movie.title.toLowerCase().includes(query.toLowerCase());
  });

  const handleSelect = movie => {
    setSelected(movie);
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
        {query && !selected && (
          <ul>
            {filteredMovies.map(movie => (
              <li key={movie.title} onClick={() => handleSelect(movie)}>
                {movie.title}
              </li>
            ))}
          </ul>
        )}
        
        <div>
          {selected ? (
            <div>
              <h2>
                {selected.title} {selected.favorite ? '❤️' : ''}
              </h2>
              <p>Author: {selected.author}</p>
              <p>Genre: {selected.genre}</p>
              <p>Date:{selected.date}</p>
              <p>{selected.favorite}</p>
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
