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
import MovieMenuDetails from "../../../components/MovieMenuDetails";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isWatched, setIsWatched] = useState(false);
  const [movieMedia, setMovieMedia] = useState(null);
  const [isOnWatchList, setOnWatchList] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("reparto");

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
        <div className=" mb-10 flex flex-col md:flex-row items-center md:items-start md:justify-center gap-8">
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
              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  onClick={
                    isWatched ? handleMarkAsUnWatched : handleMarkAsWatched
                  }
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-base transition-all duration-300 shadow-lg ${
                    isWatched
                      ? "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white ring-1 ring-gray-500"
                      : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transform hover:scale-[1.03] hover:shadow-blue-500/20"
                  }`}
                >
                  <span className="text-xl">
                    {isWatched ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  <span>{isWatched ? "Vista" : "Marcar como vista"}</span>
                </button>

                <button
                  onClick={
                    isOnWatchList
                      ? handleMarkAsNoWatchList
                      : handleMarkAsWatchList
                  }
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-base transition-all duration-300 shadow-lg ${
                    isOnWatchList
                      ? "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white ring-1 ring-cyan-400"
                      : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white transform hover:scale-[1.03] hover:shadow-green-500/20"
                  }`}
                >
                  <span className="text-xl">
                    {isOnWatchList ? <FaCheck /> : <FaPlus />}
                  </span>
                  <span>
                    {isOnWatchList ? "En tu Watchlist" : "Añadir a Watchlist"}
                  </span>
                </button>
              </div>
            ) : (
              <Link to="/auth">
                <button className="mt-6 px-7 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium text-base transition-all duration-300 shadow-lg transform hover:scale-[1.03] flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Inicia sesión para marcar como vista o añadir a Watchlist
                </button>
              </Link>
            )}
          </div>
        </div>
        <MovieMenuDetails
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
        <>
          {(() => {
            switch (selectedMenu) {
              case "reparto":
                return <Cast cast={movie.credits?.cast || []} />;
              case "imagenes":
                return <ImageSlider images={movieMedia?.backdrops || []} />;
              case "reseñas":
                return <p>Esta funcionalidad se añadirá próximamente</p>;
              default:
                return null;
            }
          })()}
        </>
      </div>
    </div>
  );
};

export default MovieDetails;
