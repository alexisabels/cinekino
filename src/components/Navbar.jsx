import { useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { useAuth } from "../services/AuthProvider";

const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-50 w-full">
      <div className="container mx-auto flex justify-between items-center h-16">
        <div className="flex space-x-10">
          <Link
            to="/"
            className="text-white text-lg font-semibold hover:text-gray-400"
          >
            Inicio
          </Link>
          <Link
            to="/people"
            className="text-white text-lg font-semibold hover:text-gray-400"
          >
            Personas
          </Link>
          <Link
            to="/lists"
            className="text-white text-lg font-semibold hover:text-gray-400"
          >
            Listas
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to={`/u/${user.username}`}
                className="text-white text-lg font-semibold hover:text-gray-400"
              >
                Mi Perfil
              </Link>
              <p className="text-white">
                Bienvenido, {user.username || "Usuario"}
              </p>
              <LogoutButton />
            </div>
          ) : (
            <LoginButton />
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className={`text-white transform transition-transform duration-300 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-700 text-white -mx-4 -mb-4 p-4">
          {user ? (
            <div className="flex flex-col gap-3">
              <Link
                to={`/u/${user.username}`}
                className="block py-2 px-4 text-lg font-semibold hover:text-gray-400"
              >
                Mi Perfil
              </Link>
              <p className="text-white px-4 text-md">
                Bienvenido, {user.username || "Usuario"}
              </p>
              <LogoutButton />
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
