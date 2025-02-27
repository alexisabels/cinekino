import { useEffect, useState } from "react";
import { getPopularMovies } from "../../services/tmdbService";
import MovieList from "../../components/MovieList";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Películas Populares</h2>
          <Link
            to="/movies"
            className="text-blue-400 hover:text-blue-300 flex items-center transition"
          >
            Ver todas <FaArrowRight className="ml-2" />
          </Link>
        </div>
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default PopularMovies;
