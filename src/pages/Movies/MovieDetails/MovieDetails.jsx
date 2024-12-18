import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { auth } from "../../../../firebaseConfig";
import { fetchMovieDetails, fetchMovieMedia } from "../../../services/tmdbService";
import {
  checkIfMovieWatched,
  markMovieAsUnWatched,
  markMovieAsWatched,
} from "../../../services/movieFirebase";
import Cast from "./Cast";
import ImageSlider from "../../../components/ImageSlider";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isWatched, setIsWatched] = useState(false);
  const [movieMedia, setMovieMedia] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await fetchMovieDetails(id);
        setMovie(movieData);
        console.log(movieData);
        const movieMedia = await fetchMovieMedia(id);
        setMovieMedia(movieMedia);
        console.log(movieMedia);
        const user = auth.currentUser;
        if (user) {
          const watched = await checkIfMovieWatched(user.uid, id);
          setIsWatched(watched);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleMarkAsWatched = async () => {
    const user = auth.currentUser;
    if (user && movie) {
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
    if (user && movie) {
      try {
        await markMovieAsUnWatched(user.uid, id);
        setIsWatched(false);
      } catch (error) {
        console.error("Error al marcar la película como no vista:", error);
      }
    }
  };

  if (!movie) return <div>Cargando...</div>;
  const releaseDate = movie.release_date;
  const year = releaseDate.split("-")[0];
  return (
    <div className="pb-7">
      <div className="relative mt-7 flex flex-col lg:flex-row items-center lg:items-start lg:justify-evenly gap-8 p-4">
        <div className="relative flex-shrink-0 max-w-xs lg:max-w-md transform hover:scale-105 transition duration-300">
          <img
            className="w-full rounded-lg shadow-xl "
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="relative transform hover:scale-105 transition duration-300 lg:max-w-lg flex flex-col gap-6 bg-slate-100 bg-opacity-90 rounded-lg shadow-xl ">
          <img
            className="hidden md:block"
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            alt={movie.title}
          />
          <div className="p-6">
            <h2 className="text-4xl text-slate-900 font-extrabold tracking-tight md:text-5xl lg:text-4xl mb-2">
              {movie.title} &#40;{year}&#41;
            </h2>
            <p className="text-gray-500 font-bold text-lg mb-2 italic ">
              {movie.credits.crew[0].name}
            </p>

            <div className="flex gap-3 flex-wrap mb-4">
              {movie.genres.map((genre) => (
                <div
                  key={genre.id}
                  className="rounded-md bg-slate-800 py-1 px-4 border border-transparent text-sm text-white transition-all shadow-sm"
                >
                  {genre.name}
                </div>
              ))}
              <p className="text-gray-700 ">
                {movie.release_date} &#40;{movie.origin_country}&#41;
              </p>
            </div>

            <p className="text-lg text-gray-700 mb-4">{movie.overview}</p>

            {auth.currentUser ? (
              <button
                onClick={
                  isWatched ? handleMarkAsUnWatched : handleMarkAsWatched
                }
                className={`mt-4 px-6 py-3 rounded-md ${
                  isWatched
                    ? "bg-gray-500 hover:bg-gray-600"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white text-lg transition duration-300`}
              >
                {isWatched ? "Vista" : "Marcar como vista"}
              </button>
            ) : (
              <button
                className={`mt-4 px-6 py-3 rounded-md bg-gray-500 hover:bg-gray-600 text-white text-lg transition duration-300`}
              >
                <Link to="/auth">Inicia sesión para marcarla como vista</Link>{" "}
              </button>
            )}
          </div>
        </div>
      </div>
      <Cast cast={movie.credits.cast} />
      <ImageSlider images={movieMedia?.backdrops || []} />
      </div>
  );
};

export default MovieDetails;
