import React from 'react';

const MovieItem = ({ movie, handleSelect }) => {
  return (
    <div className="movie__item" onClick={() => handleSelect(movie)}>
      <div>
        <h2>{movie.title}</h2>
        <p>Author: {movie.author}</p>
        <p>Year: {movie.date}</p>
        <p>Genre: {movie.genre}</p>
        <p>Rating: {movie.rating}</p>
      </div>
    </div>
  );
};

export default MovieItem;