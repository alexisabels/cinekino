import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../../../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import GoogleIcon from "../../assets/GoogleIcon";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthProvider";

const Auth = () => {
  const navigate = useNavigate();
  const { setRequiresUsername } = useAuth();

  const handleLoginWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, { id: user.uid });
        setRequiresUsername(true);
      } else {
        const userData = userDoc.data();
        if (userData.username) {
          setRequiresUsername(false);
        } else {
          setRequiresUsername(true);
        }
      }

      navigate("/");
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-28 bg-gray-900 text-white mx-5">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ingresa al instante con tu cuenta de Google
        </h2>
        <p className="text-gray-400 mb-4">
          No importa si ya tienes cuenta o no, es rápido y fácil.
        </p>
        <button
          type="button"
          onClick={handleLoginWithGoogle}
          className="transition duration-200 w-full inline-flex select-none items-center justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          <GoogleIcon className="mr-2" />
          Accede con Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
