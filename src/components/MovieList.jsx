/* eslint-disable react/prop-types */

import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4">
    {movies.length > 0 ? (
      movies.map((movie) => (
        <div key={movie.id} className="w-full max-w-xs mx-auto">
          <MovieCard movie={movie} />
        </div>
      ))
    ) : (
      <p className="text-white">No hay películas disponibles.</p>
    )}
  </div>
  
  );
};

export default MovieList;
