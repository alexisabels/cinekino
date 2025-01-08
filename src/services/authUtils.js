import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const fetchUserDoc = async (uid) => {
  const userDoc = await getDoc(doc(db, "users", uid));
  return userDoc.exists() ? userDoc.data() : null;
};

export const onAuthStateChanged = (callback) => {
  return auth.onAuthStateChanged(callback);
};
