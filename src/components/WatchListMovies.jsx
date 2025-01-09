/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import MovieList from "./MovieList";
import SmallSpinner from "./SmallSpinner";

const WatchListMovies = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchListMovies = async () => {
      try {
        if (user && user.id) {
          const q = query(
            collection(db, "watchList"),
            where("userId", "==", user.id)
          );
          const querySnapshot = await getDocs(q);
          const moviesList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMovies(moviesList);
        } else {
          console.error("User is not defined or does not have an ID");
        }
      } catch (error) {
        console.error("Error al obtener la watchList:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchListMovies();
  }, [user]);

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Watchlist</h2>
        <SmallSpinner />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Watchlist</h2>
      <MovieList movies={movies} />
    </div>
  );
};

export default WatchListMovies;
