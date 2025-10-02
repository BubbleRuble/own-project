import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../config';
import MovieItem from '../components/MovieItem';

const Movie = () => {
  const [currentMovie, setCurrentMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const handleSelect = movie => {
    setCurrentMovie(currentMovie);
  };

  useEffect(() => {
    const fetchMovie = async movieId => {
      try {
        const { data } = await api.get(`/api/movies/${params.id}`);
        setCurrentMovie(data);
      } catch (error) {
        console.error('Помилка при завантаженні деталей фільму:', error);
      }
    };
    fetchMovie();
  }, []);

  if (!currentMovie) return <p>Loading...</p>;

  return (
    <>
      <h1>Here is your result</h1>
      <div >
        <MovieItem movies={currentMovie} handleSelect={handleSelect} />
      </div>
    </>
  );
};

export default Movie;
