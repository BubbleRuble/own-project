import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { getMovies } from '../api/movies';
import { api } from '../config';
import MovieList  from '../components/MovieList';
import MovieItem from '../components/MovieItem';


const Movie = () => {
  // const handleMovieClick = async (movieId) => {
  //     try {
  //       await api.get(`/api/movies/${movieId}`);
  //       setSelectedMovie(data);

  //       navigate(`/movies/${movieId}`)
  //     } catch (error) {
  //       console.error('Помилка при завантаженні деталей фільму:', error);
  //     }
  //   };

  const [currentMovie, setCurrentMovie] = useState([]);
  const [loading, setLoading] = useState(true)
  const params = useParams();
  // console.log(params);

  const handleSelect = (movie) => {
    setCurrentMovie(currentMovie); 
  };

  useEffect(() => {
    const fetchMovie = async movieId => {
      try {
        const {data} = await api.get(`/api/movies/${params.id}`);
        setCurrentMovie(data);
      } catch (error) {
        console.error('Помилка при завантаженні деталей фільму:', error);
      }
    };
    fetchMovie()
  }, []);

  if (!currentMovie) return <p>Loading...</p>

  return (
    <>
    <h1>Here is your result</h1>
      <div className="movie-list">

            <MovieItem movies={currentMovie} handleSelect={handleSelect}/>
      </div>
    </>
  );
};

export default Movie;
