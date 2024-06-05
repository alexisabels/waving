import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { POSTS_SIZE } from "../config";

export function useLikedPosts(userId, pageSize = POSTS_SIZE) {
  const [likedPosts, setLikedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchLikedPosts = async (loadMore = false) => {
    if (!userId || !hasMore) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      let q = query(
        collection(db, "posts"),
        where("likes", "array-contains", userId),
        limit(pageSize)
      );

      if (loadMore && lastVisible) {
        q = query(q, startAfter(lastVisible));
      }

      const querySnapshot = await getDocs(q);
      const newPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLikedPosts((prev) => (loadMore ? [...prev, ...newPosts] : newPosts));
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

      if (newPosts.length < pageSize) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching liked posts: ", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchLikedPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return { likedPosts, isLoading, fetchLikedPosts, hasMore };
}
