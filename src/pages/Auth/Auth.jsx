import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import GoogleIcon from "../../assets/GoogleIcon";
import { signInWithPopup } from "firebase/auth";
import { provider } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged in with email");
        navigate("/");
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Registered and logged in with email");

        await updateProfile(auth.currentUser, {
          displayName: username,
        });

        console.log("Username set:", auth.currentUser.displayName);

        await setDoc(doc(db, "users", userCredential.user.uid), {
          username,
          email,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleLoginWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      console.log("Logged in with Google");
      navigate("/");

      if (!isLogin) {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          username: userCredential.user.displayName,
          email: userCredential.user.email,
        });
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">
        {isLogin ? "Iniciar sesión" : "Registrarse"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm"
      >
        {!isLogin && (
          <div className="mb-4">
            <label className="block text-gray-300">Nombre de usuario:</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
              required={!isLogin}
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-300">Correo electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200  dark:focus:ring-gray-700 focus:ring-4 focus:ring-gray-100"
        >
          {isLogin ? "Iniciar sesión" : "Registrarse"}
        </button>
        <button
          type="button"
          onClick={handleLoginWithGoogle}
          className="mt-4 transition duration-200 w-full inline-flex select-none items-center justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          <GoogleIcon className="mr-2" />
          {isLogin ? "Iniciar sesión con Google" : "Registrarse con Google"}
        </button>
        <button
          type="button"
          onClick={toggleAuthMode}
          className="mt-4 w-full text-blue-400 hover:text-blue-500 transition duration-300"
        >
          {isLogin
            ? "¿No tienes una cuenta? Regístrate"
            : "¿Ya tienes una cuenta? Inicia sesión"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
