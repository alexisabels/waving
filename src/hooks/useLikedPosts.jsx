import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { getAuth } from "firebase/auth";

export function useLikedPosts() {
  const [likedPosts, setLikedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const q = query(
      collection(db, "posts"),
      where("likes", "array-contains", userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLikedPosts(posts);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  return { likedPosts, isLoading };
}
