import { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { getAuth } from "firebase/auth";

export function useLike(postId) {
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const postRef = doc(db, "posts", postId);

    const unsubscribe = onSnapshot(postRef, (doc) => {
      const postData = doc.data();
      setLikes(postData.likes || []);
      setHasLiked(postData.likes.includes(userId));
    });

    return () => unsubscribe();
  }, [postId, userId]);

  const addLike = async () => {
    if (!userId) return;
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      likes: arrayUnion(userId),
    });
  };

  const removeLike = async () => {
    if (!userId) return;
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      likes: arrayRemove(userId),
    });
  };

  return {
    likes,
    hasLiked,
    addLike,
    removeLike,
  };
}
