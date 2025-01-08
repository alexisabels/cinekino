import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../services/AuthProvider";

const CreateUsernameModal = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (username.trim() === "") {
      setError("El nombre de usuario no puede estar vacío.");
      return;
    }

    try {
      await updateDoc(doc(db, "users", user.uid), {
        username: username.trim(),
      });
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
          placeholder="Ingresa un nombre"
          className="w-full border text-gray-900 border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          onClick={handleSave}
          className="transition duration-200 w-full inline-flex select-none items-center justify-center text-white bg-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-800 focus:ring-4 focus:ring-gray-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default CreateUsernameModal;
