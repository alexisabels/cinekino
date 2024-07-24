import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
