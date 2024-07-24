/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Link to={`/movie/${movie.movieId || movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-2">
          <h3 className="text-sm font-bold text-slate-950">{movie.title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
