import { useEffect, useState } from "react";

import { useAuth } from "../services/AuthProvider";
import { fetchUserDoc } from "../services/authUtils";
import Lists from "../components/Lists";

const MyLists = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (authUser) {
        const userData = await fetchUserDoc(authUser.uid);
        setUser(userData);
      }
    };

    fetchUserData();
  }, [authUser]);

  console.log(user);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 mt-4">Mis listas</h1>

      <Lists user={user} />
    </div>
  );
};

export default MyLists;
