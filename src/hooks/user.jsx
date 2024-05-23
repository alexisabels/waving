import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

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

  return { user, loading, error };
}
