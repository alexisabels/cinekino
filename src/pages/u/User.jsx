import { useParams } from "react-router-dom";
import WatchedMovies from "../../components/WatchedMovies";
import WatchListMovies from "../../components/WatchListMovies";
import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, where, query } from "firebase/firestore";
import Spinner from "../../components/Spinner";
import ProfileMenuMovies from "../../components/ProfileMenuMovies";

const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("watched");

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
      {user ? (
        <h1 className="text-3xl font-bold mb-4">Perfil de {username}</h1>
      ) : null}

      <ProfileMenuMovies
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
        {user ? (
          <>
            {selectedMenu === "watched" ? (
              <WatchedMovies user={user} />
            ) : (
              <WatchListMovies user={user} />
            )}
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">Esta cuenta no existe</h1>
            <p>Intenta hacer otra búsqueda.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default User;
