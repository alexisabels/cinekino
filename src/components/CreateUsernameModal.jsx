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

  const handleSave = async () => {
    if (username.trim() === "") {
      setError("El nombre de usuario no puede estar vacío.");
      return;
    }

    // Validar caracteres especiales
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphanumericRegex.test(username)) {
      setError(
        "El nombre de usuario solo puede contener caracteres alfanuméricos."
      );
      return;
    }

    // Verificar si el nombre de usuario ya existe
    const q = query(
      collection(db, "users"),
      where("username", "==", username.trim())
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setError("El nombre de usuario ya está en uso.");
      return;
    }

    try {
      await updateDoc(doc(db, "users", user.uid), {
        username: username.trim(),
      });
      setRequiresUsername(false);
      window.location.reload();
    } catch (err) {
      setError("Hubo un error al guardar el username.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative bg-white text-gray-900 mx-5 p-6 rounded-lg shadow-md w-full max-w-sm text-center z-10">
        <h2 className="text-2xl font-bold mb-4">Crea tu Nombre de Usuario</h2>
        <p className="text-gray-600 mb-4">
          Ingresa un nombre de usuario para completar tu perfil.
        </p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingresa un nombre de usuario"
          className="w-full border text-gray-900 border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          onClick={handleSave}
          className="transition duration-200 w-full inline-flex select-none items-center justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default CreateUsernameModal;
