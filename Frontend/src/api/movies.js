const BASE_URL = 'http://localhost:3000';

export const getMovies = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const addMovies = async (movie) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });
  return res.json()
}

