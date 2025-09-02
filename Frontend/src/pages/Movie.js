import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../config';


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
  const params = useParams();
  console.log(params);

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

  console.log(currentMovie)

  return (
    <>
      <div className="movie-list">

            <li
              className="movie-item"
            >
              {currentMovie.title}
            </li>
      </div>
      <h1>Hello</h1>
    </>
  );
};

export default Movie;
