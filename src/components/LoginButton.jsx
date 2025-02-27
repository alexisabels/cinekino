import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

const LoginButton = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/auth");
  };

  return (
    <button
      type="button"
      onClick={handleNavigation}
      className="inline-flex select-none items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-300 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
    >
      <FaSignInAlt className="text-sm" />
      Inicia sesión
    </button>
  );
};

export default LoginButton;
