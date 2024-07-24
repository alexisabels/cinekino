// MovieDetails.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebaseConfig";

const API_KEY = "ccac83f3684a803c1d8b44b06750a4a7";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: {
            api_key: API_KEY,
            language: "es-ES", // Puedes cambiar el idioma si lo prefieres
          },
        });
        setMovie(response.data);
        console.log("Movie data:", response.data);
      } catch (error) {
        console.error("Error al obtener detalles de la película:", error);
      }
    };

    const checkIfWatched = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "watchedMovies", `${user.uid}_${id}`);
          const docSnap = await getDoc(docRef);
          setIsWatched(docSnap.exists());
          console.log("Is movie watched:", docSnap.exists());
        }
      } catch (error) {
        console.error(
          "Error al verificar si la película está marcada como vista:",
          error
        );
      }
    };

    fetchMovie();
    checkIfWatched();
  }, [id]);

  const handleMarkAsWatched = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, "watchedMovies", `${user.uid}_${id}`);
        await setDoc(docRef, {
          userId: user.uid,
          movieId: id,
          title: movie.title,
          poster_path: movie.poster_path,
          watchedAt: new Date(),
        });
        setIsWatched(true);
        console.log("Película marcada como vista");
      } catch (error) {
        console.error("Error al marcar la película como vista:", error);
      }
    }
  };

  if (!movie) return <div>Cargando....</div>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <button
        onClick={handleMarkAsWatched}
        className={`mt-4 px-4 py-2 rounded ${
          isWatched ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
        } text-white transition duration-300`}
        disabled={isWatched}
      >
        {isWatched ? "Ya vista" : "Marcar como vista"}
      </button>
    </div>
  );
};

export default MovieDetails;
