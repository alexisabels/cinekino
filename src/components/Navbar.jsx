// src/components/Navbar.jsx

import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-10">
          <a
            href="/"
            className="text-white text-lg font-semibold hover:text-gray-400"
          >
            Inicio
          </a>
          <a
            href="/movies"
            className="text-white text-lg font-semibold hover:text-gray-400"
          >
            Películas
          </a>
          <a
            href="/people"
            className="text-white text-lg font-semibold hover:text-gray-400"
          >
            Personas
          </a>
        </div>
        <div className="text-white ">
          {user ? (
            <div className="flex items-center gap-3">
              <p className="">Welcome, {user.displayName}</p>
              <LogoutButton />
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
