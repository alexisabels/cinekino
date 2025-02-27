/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState } from "react";

const MovieCard = ({ movie }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <Link to={`/movie/${movie.movieId || movie.id}`}>
        {!imageLoaded && (
          <div
            role="status"
            className="flex items-center justify-center aspect-[2/3] bg-gray-300 rounded-t-lg animate-pulse dark:bg-gray-700"
          >
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className={`w-full aspect-[2/3] object-cover ${
            imageLoaded ? "block" : "hidden"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        <div className="p-3 md:p-4 bg-gray-100">
          <h3 className="text-sm md:text-base font-bold text-slate-950 truncate">
            {movie.title}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
