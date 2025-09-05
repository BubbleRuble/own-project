import React from 'react';

const MovieItem = ({ movies, handleSelect }) => {
  return (
    <div className="movie__item" onClick={() => handleSelect(movies)}>
      <div>
        <h2>{movies.title}</h2>
        <p>Author: {movies.author}</p>
        <p>Year: {movies.date}</p>
        <p>Genre: {movies.genre}</p>
        <p>Rating: {movies.rating}</p>
      </div>
    </div>
  );
};

export default MovieItem;