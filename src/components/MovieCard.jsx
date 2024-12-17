/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
<div className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
<Link to={`/movie/${movie.movieId || movie.id}`}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        className="w-full aspect-[2/3] object-cover"
      />
      <div className="p-3 md:p-4">
        <h3 className="text-sm md:text-base font-bold text-slate-950 truncate">
          {movie.title}
        </h3>
      </div>
    </Link>
  </div>
  
  );
};

export default MovieCard;
