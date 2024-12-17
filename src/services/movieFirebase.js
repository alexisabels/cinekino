import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import {db } from "../../firebaseConfig";

export const checkIfMovieWatched = async (userId, movieId) => {
  try {
    const docRef = doc(db, "watchedMovies", `${userId}_${movieId}`);
    const docSnap = await getDoc(docRef);

    return docSnap.exists();
  } catch (error) {
    console.error(
      "Error al verificar si la película está marcada como vista:",
      error
    );
    throw error;
  }
};

export const markMovieAsWatched = async (userId, movieId, movieData) => {
  try {
    const docRef = doc(db, "watchedMovies", `${userId}_${movieId}`);
    await setDoc(docRef, {
      userId,
      movieId,
      ...movieData,
      watchedAt: new Date(),
    });
  } catch (error) {
    console.error("Error al marcar la película como vista:", error);
    throw error;
  }
};
export const markMovieAsUnWatched = async (userId, movieId) => {
  try {
    const docRef = doc(db, "watchedMovies", `${userId}_${movieId}`);
    await deleteDoc(docRef);
    } catch (error) {
    console.error("Error al marcar la película como vista:", error);
    throw error;
  }
};