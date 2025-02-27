import { getPopularMovies } from "./tmdbService";

export const fetchFeaturedMovie = async (setFeaturedMovie) => {
  const movies = await getPopularMovies();
  if (movies && movies.length > 0) {
    setFeaturedMovie(movies[Math.floor(Math.random() * 5)]);
  }
};
