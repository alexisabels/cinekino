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
    <div className="container mx-auto p-4 max-w-6xl">
      {!user && (
        <div className="animate-pulse flex flex-col items-center p-8">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
        </div>
      )}

      {user && (
        <div className="bg-gray-700 rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-slate-500 to-gray-600 p-6 text-white">
            <div className="flex flex-col md:flex-row items-center gap-5">
              <div className="w-24 h-24 rounded-full bg-white p-1 flex-shrink-0">
                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${username}&background=random`
                  }
                  alt={`${username}'s profile`}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold">{username}</h1>

                <div className="mt-3 flex flex-wrap gap-3 justify-center md:justify-start">
                  {/* {user.location && (
                    <span className="inline-flex items-center text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {user.location}
                    </span>
                  )}
                  {user.joinDate && (
                    <span className="inline-flex items-center text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Miembro desde{" "}
                      {new Date(user.joinDate).toLocaleDateString()}
                    </span>
                  )} */}
                </div>
              </div>

              {/*  todo: solo sacar si el usuario es el actual! */}
              <div className="md:ml-auto mt-4 md:mt-0">
                <button className="bg-white text-blue-600 hover:bg-blue-50 font-medium px-4 py-2 rounded-full text-sm transition">
                  Editar perfil
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h2 className="text-2xl font-bold text-white">Mis Listas</h2>
            </div>
            <div className="border-t border-gray-700">
              <Lists user={user} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
