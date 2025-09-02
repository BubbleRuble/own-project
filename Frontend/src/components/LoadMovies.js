import MovieForm from './MovieForm';
import { addMovies, getMovies } from '../api/movies';
import { useState, useEffect } from 'react';

const Movies = () => {
  const [message, setMessage] = useState('');

    const handlePostMovie = async (values, { resetForm, setErrors }) => {
    try {
      const newMovie = await addMovies(values);
      if (newMovie.error) {
        setErrors({ [newMovie.error.field]: newMovie.error.message });
        return;
      }
      setMessage(`Movie ${newMovie.title} added`);
      resetForm();
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <>
    {/* {
      movies && movies.map(item=> (
        <div>{JSON.stringify(item, 2, null)}</div>
      ))
    } */}
    {/* Visualize all movies from what we have got from backend */}
      <h1>Add your movie</h1>
      <MovieForm onSubmit={handlePostMovie} />
    </>
  );
};

export default Movies;
