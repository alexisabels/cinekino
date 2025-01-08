import { useParams } from "react-router-dom";
import WatchedMovies from "../../components/WatchedMovies";
import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { query } from "firebase/database";
import { collection, getDocs, where } from "firebase/firestore";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    fetchUser();
  }, [username]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-boldp-4">Perfil de {username}</h1>
      <WatchedMovies user={user} />
    </div>
  );
};

export default Profile;
