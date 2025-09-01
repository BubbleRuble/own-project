const MovieList = ({ movies }) => {
  return (
    <div>
      {movies.map((movies, index) => (
        <div key={index}>
          <h2>{movies.title}</h2>
          <p>Author: {movies.author}</p>
          <p>Genre: {movies.genre}</p>
          <p>Date: {movies.date}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
