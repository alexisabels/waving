// hooks/useFollowedPosts.js
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { useFollow } from "./useFollow";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

export function useFollowedPosts(currentUserId) {
  const { following, loadingFollowing } = useFollow(currentUserId);
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (loadingFollowing) return;

      if (following.length > 0) {
        setLoading(true);
        try {
          const postsQuery = query(
            collection(db, "posts"),
            where("uid", "in", following),
            orderBy("date", "desc"),
          );
          const querySnapshot = await getDocs(postsQuery);
          const postsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPosts(postsData);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [following, loadingFollowing]);

  return { posts, isLoading, error };
}
