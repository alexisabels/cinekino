import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { auth } from "../../../../firebaseConfig";
import {
  fetchMovieDetails,
  fetchMovieMedia,
} from "../../../services/tmdbService";
import {
  checkIfMovieOnWatchlist,
  checkIfMovieWatched,
  markMovieAsNoWatchList,
  markMovieAsUnWatched,
  markMovieAsWatched,
  markMovieAsWatchList,
} from "../../../services/movieFirebase";
import Cast from "./Cast";
import ImageSlider from "../../../components/ImageSlider";
import Spinner from "../../../components/Spinner";
import { FaCheck, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa6";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isWatched, setIsWatched] = useState(false);
  const [movieMedia, setMovieMedia] = useState(null);
  const [isOnWatchList, setOnWatchList] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await fetchMovieDetails(id);
        setMovie(movieData || {});
        const mediaData = await fetchMovieMedia(id);
        setMovieMedia(mediaData || {});
        const user = auth.currentUser;
        if (user) {
          const watched = await checkIfMovieWatched(user.uid, id);
          setIsWatched(watched);
          const watchList = await checkIfMovieOnWatchlist(user.uid, id);
          setOnWatchList(watchList);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleMarkAsWatched = async () => {
    const user = auth.currentUser;
    if (user && movie.title && movie.poster_path) {
      try {
        await markMovieAsWatched(user.uid, id, {
          title: movie.title,
          poster_path: movie.poster_path,
        });
        setIsWatched(true);
      } catch (error) {
        console.error("Error al marcar la película como vista:", error);
      }
    }
  };

  const handleMarkAsUnWatched = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await markMovieAsUnWatched(user.uid, id);
        setIsWatched(false);
      } catch (error) {
        console.error("Error al marcar la película como no vista:", error);
      }
    }
  };
  const handleMarkAsWatchList = async () => {
    const user = auth.currentUser;
    if (user && movie.title && movie.poster_path) {
      try {
        await markMovieAsWatchList(user.uid, id, {
          title: movie.title,
          poster_path: movie.poster_path,
        });
        setOnWatchList(true);
      } catch (error) {
        console.error("Error al marcar la película como watchlist:", error);
      }
    }
  };
  const handleMarkAsNoWatchList = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await markMovieAsNoWatchList(user.uid, id);
        setOnWatchList(false);
      } catch (error) {
        console.error("Error al marcar la película como no watchlist:", error);
      }
    }
  };
  if (!movie || Object.keys(movie).length === 0) return <Spinner />;

  const releaseDate = movie.release_date || "Desconocido";
  const year = releaseDate.split("-")[0] || "N/A";
  const posterPath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const backdropPath = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
  const genres = movie.genres || [];
  const director =
    movie.credits?.crew?.find((crewMember) => crewMember.job === "Director")
      ?.name || "Desconocido";

  return (
    <div className="relative min-h-screen bg-black">
      {backdropPath && (
        <div
          className="absolute inset-0 w-full max-h-[96vh] bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${backdropPath})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
          }}
        >
          <div className="w-full h-full bg-gradient-to-b from-transparent to-black"></div>
        </div>
      )}
      <div className="relative z-10 flex flex-col items-center px-4 py-8 bg-black bg-opacity-70">
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-center gap-8">
          <div className="flex-shrink-0 max-w-xs md:max-w-sm transform hover:scale-105 transition duration-300">
            <img
              className="w-full rounded-lg shadow-xl"
              src={posterPath}
              alt={movie.title || "Título desconocido"}
            />
          </div>
          <div className="text-white p-6 max-w-2xl">
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">
              {movie.title || "Título desconocido"} &#40;{year}&#41;
            </h2>
            <p className="text-gray-300 font-semibold text-lg mb-2 italic">
              Director: {director}
            </p>
            <div className="flex gap-3 flex-wrap mb-4">
              {genres.map((genre) => (
                <div
                  key={genre.id}
                  className="rounded-md bg-slate-800 bg-opacity-80 py-1 px-4 text-sm text-white transition-all shadow-sm"
                >
                  {genre.name}
                </div>
              ))}
            </div>
            <p className="text-gray-200 mb-4">
              Fecha de estreno: {releaseDate} &#40;
              {movie.origin_country || "N/A"}&#41;
            </p>
            <p className="text-lg text-gray-100 mb-6">
              {movie.overview || "Sin descripción disponible."}
            </p>
            {auth.currentUser ? (
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <button
                  onClick={
                    isWatched ? handleMarkAsUnWatched : handleMarkAsWatched
                  }
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-md ${
                    isWatched
                      ? "bg-gray-500 hover:bg-gray-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white text-lg transition duration-300`}
                >
                  {isWatched ? <FaEyeSlash /> : <FaEye />}
                  {isWatched ? "Vista" : "Marcar como vista"}
                </button>
                <button
                  onClick={
                    isOnWatchList
                      ? handleMarkAsNoWatchList
                      : handleMarkAsWatchList
                  }
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-md ${
                    isOnWatchList
                      ? "bg-cyan-500 hover:bg-cyan-600"
                      : "bg-green-700 hover:bg-green-900"
                  } text-white text-lg transition duration-300`}
                >
                  {isOnWatchList ? <FaCheck /> : <FaPlus />}
                  {isOnWatchList ? "En tu Watchlist" : "Añadir a watchlist"}
                </button>
              </div>
            ) : (
              <button
                className={`mt-4 px-6 py-3 rounded-md bg-gray-500 hover:bg-gray-600 text-white text-lg transition duration-300`}
              >
                <Link to="/auth">Inicia sesión para marcarla como vista</Link>
              </button>
            )}
          </div>
        </div>
        <Cast cast={movie.credits?.cast || []} />
        <ImageSlider images={movieMedia?.backdrops || []} />
      </div>
    </div>
  );
};

export default MovieDetails;
