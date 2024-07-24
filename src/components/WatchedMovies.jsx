import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../services/AuthProvider";
import MovieList from "./MovieList";

const WatchedMovies = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchedMovies = async () => {
      try {
        if (user) {
          const q = query(
            collection(db, "watchedMovies"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          const moviesList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMovies(moviesList);
        }
      } catch (error) {
        console.error("Error al obtener películas vistas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchedMovies();
  }, [user]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Películas Vistas</h2>
      <MovieList movies={movies} />
    </div>
  );
};

export default WatchedMovies;
