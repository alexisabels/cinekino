/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { fetchUserDoc, onAuthStateChanged } from "./authUtils";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requiresUsername, setRequiresUsername] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (currentUser) => {
      setLoading(true);

      if (currentUser) {
        const userData = await fetchUserDoc(currentUser.uid);
        if (userData && userData.username) {
          setUser({ ...currentUser, username: userData.username });
          setRequiresUsername(false);
        } else {
          setUser(currentUser);
          setRequiresUsername(true);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, requiresUsername }}>
      {loading ? <Spinner /> : children}
    </AuthContext.Provider>
  );
};
