import { useState } from "react";
import {
  doc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../services/AuthProvider";

const CreateUsernameModal = () => {
  const { user, setRequiresUsername } = useAuth();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const MAX_LENGTH = 20;
  const MIN_LENGTH = 3;

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_LENGTH) {
      setUsername(value);
      setCharCount(value.length);
      setError("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleSave = async () => {
    if (username.trim() === "") {
      setError("El nombre de usuario no puede estar vacío.");
      return;
    }

    if (username.length < MIN_LENGTH) {
      setError(
        `El nombre de usuario debe tener al menos ${MIN_LENGTH} caracteres.`
      );
      return;
    }

    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphanumericRegex.test(username)) {
      setError(
        "El nombre de usuario solo puede contener caracteres alfanuméricos."
      );
      return;
    }

    setIsLoading(true);

    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", username.trim())
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setError("El nombre de usuario ya está en uso.");
        setIsLoading(false);
        return;
      }

      await updateDoc(doc(db, "users", user.uid), {
        username: username.trim(),
      });
      setRequiresUsername(false);
      window.location.reload();
    } catch (err) {
      setError("Hubo un error al guardar el username.");
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="username-modal-title"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="relative bg-white dark:bg-gray-800 text-gray-900 dark:text-white mx-5 p-6 rounded-lg shadow-lg w-full max-w-sm text-center z-10 transform transition-all">
        <h2 id="username-modal-title" className="text-2xl font-bold mb-4">
          Crea tu Nombre de Usuario
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Ingresa un nombre de usuario para completar tu perfil.
        </p>
        <div className="mb-4">
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ingresa un nombre de usuario"
            className="w-full border text-gray-900 dark:text-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            autoFocus
            aria-invalid={!!error}
            aria-describedby={error ? "username-error" : undefined}
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
            {error ? (
              <p id="username-error" className="text-red-500 font-medium">
                {error}
              </p>
            ) : (
              <p>
                {username.length > 0 ? `${MIN_LENGTH} caracteres mínimo` : ""}
              </p>
            )}
            <p>
              {charCount}/{MAX_LENGTH}
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isLoading}
          className={`transition duration-200 w-full inline-flex select-none items-center justify-center font-medium rounded-lg text-sm px-5 py-3 ${
            isLoading
              ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
              : "text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Guardando...
            </>
          ) : (
            "Guardar"
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateUsernameModal;
