import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, where, query } from "firebase/firestore";
import Spinner from "../../components/Spinner";
import Lists from "../../components/Lists";

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
  console.log(user);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto p-4">
      {user ? (
        <h1 className="text-3xl font-bold mb-4">Perfil de {username}</h1>
      ) : null}

      <Lists user={user} />
    </div>
  );
};

export default User;
