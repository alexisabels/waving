import { db } from "../lib/firebase";
import { collection, query, getDocs, limit } from "firebase/firestore";

export const fetchUsers = async () => {
  try {
    const q = query(collection(db, "users"), limit(10));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return [];
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
};
