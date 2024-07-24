import { useEffect, useState } from "react";
import { getPopularMovies } from "../../services/tmdbService";
import MovieList from "../../components/MovieList";

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Películas Populares</h2>
      <MovieList movies={movies} />
    </div>
  );
};

export default PopularMovies;
