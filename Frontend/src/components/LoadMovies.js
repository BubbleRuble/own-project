import MovieForm from './MovieForm';
import { addMovies } from '../api/movies';
import { useState } from 'react';

const LoadMovies = () => {
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
      <h1>Add your movie</h1>
      <MovieForm onSubmit={handlePostMovie} />
    </>
  );
};

export default LoadMovies;
