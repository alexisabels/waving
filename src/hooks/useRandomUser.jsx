import { useState, useEffect } from "react";
import { collection, query, getDocs, limit } from "firebase/firestore";
import { db } from "../lib/firebase"; // Ajusta la ruta de importación si es necesario

const useRandomUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const q = query(collection(db, "users"), limit(1));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const fetchedUser = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))[0];
          setUser(fetchedUser);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useRandomUser;
