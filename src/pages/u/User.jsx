import { useParams } from "react-router-dom";
import WatchedMovies from "../../components/WatchedMovies";
import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, where, query } from "firebase/firestore";
import Spinner from "../../components/Spinner";

const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const q = query(
        collection(db, "users"),
        where("username", "==", username.trim())
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUser(userData);
      } else {
        setUser(null);
        console.log("No se encontró el usuario");
      }
      setLoading(false);
    };
    fetchUser();
  }, [username]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
        <h1 className="text-3xl font-bold mb-4">Perfil de {username}</h1>
        {user ? (
          <>
            <WatchedMovies user={user} />
          </>
        ) : (
          <p>No se encontró el usuario</p>
        )}
      </div>
    </div>
  );
};

export default User;
