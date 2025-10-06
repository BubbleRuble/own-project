import { useState } from "react"

export const favoritesMovies = () => {
  const [favorite, setFavorite] = useState([]);

  const toggleFavorite = (movie) => {
    if (favoritesMovies.find((fav) => fav.id === movie.id)) {
      setFavorite(favoritesMovies.filter((fav) => fav.id !== movie.id))
    } else {
      setFavorite([...favoritesMovies, movie])
    }
  }

  return (
    <>
    
    </>
  )
};

