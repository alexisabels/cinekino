import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { useAuth } from "../services/AuthProvider";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-10 w-full">
      <div className="container mx-auto flex justify-between items-center h-16">
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
        <div className="text-white">
          {user ? (
            <div className="flex items-center gap-3">
              <a
                href="/profile"
                className="text-white text-lg font-semibold hover:text-gray-400"
              >
                Mi Perfil
              </a>
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
