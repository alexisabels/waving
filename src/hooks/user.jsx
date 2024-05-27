import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../lib/firebase"; // Asegúrate de importar storage

export function useUser(uid) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const userRef = doc(db, "users", uid);

    getDoc(userRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          setError("Usuario no encontrado");
          setUser(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener usuario:", err);
        setError(err);
        setLoading(false);
      });
  }, [uid]);

  const updateUser = async (data) => {
    const userRef = doc(db, "users", uid);
    try {
      await updateDoc(userRef, data);
      setUser((prevUser) => ({ ...prevUser, ...data }));
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
      setError(err);
    }
  };

  const updateAvatar = async (file) => {
    if (!file) return;

    const storageRef = ref(storage, `avatars/${uid}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      await updateUser({ avatar: downloadURL });
    } catch (err) {
      console.error("Error al subir avatar:", err);
      setError(err);
    }
  };

  return { user, loading, error, updateUser, updateAvatar };
}
