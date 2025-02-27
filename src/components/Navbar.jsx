import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { useAuth } from "../services/AuthProvider";

const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    return location.pathname === path ? "border-b-2 border-blue-400" : "";
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
          scrolled
            ? "bg-black/85 shadow-lg"
            : "bg-gradient-to-r from-gray-950 to-gray-800"
        }`}
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-center h-16 px-4">
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className={`text-white text-lg font-medium transition-all duration-200 hover:text-blue-400 flex items-center ${isActive(
                  "/"
                )}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Inicio
              </Link>
              {user && (
                <Link
                  to="/lists"
                  className={`text-white text-lg font-medium transition-all duration-200 hover:text-blue-400 flex items-center ${isActive(
                    "/lists"
                  )}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Listas
                </Link>
              )}
            </div>

            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link
                    to={`/u/${user.username}`}
                    className={`text-white font-medium transition-all duration-200 hover:text-blue-400 flex items-center ${isActive(
                      `/u/${user.username}`
                    )}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Mi Perfil
                  </Link>
                  <div className="relative group">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/20 text-white">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                        {user.username ? user.username[0].toUpperCase() : "U"}
                      </div>
                      <span className="text-sm font-medium">
                        {user.username || "Usuario"}
                      </span>
                    </div>
                  </div>
                  <div className="ml-2">
                    <LogoutButton />
                  </div>
                </div>
              ) : (
                <LoginButton />
              )}
            </div>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-white hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* MENÚ DEL MÓVIL */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 px-4 py-5 space-y-4 shadow-lg border-t border-gray-700">
            {user ? (
              <>
                <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                    {user.username ? user.username[0].toUpperCase() : "U"}
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Bienvenido</p>
                    <p className="text-white font-medium">
                      {user.username || "Usuario"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    to={`/u/${user.username}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700/50 text-white font-medium transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Mi Perfil
                  </Link>
                  <Link
                    to="/lists"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700/50 text-white font-medium transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Listas
                  </Link>
                </div>

                <div className="pt-2">
                  <LogoutButton />
                </div>
              </>
            ) : (
              <div className="py-2">
                <LoginButton />
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
