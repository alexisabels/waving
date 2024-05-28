import { useState, useEffect, useCallback } from "react";
import { db } from "../lib/firebase";
import { useFollow } from "./useFollow";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
  startAfter,
} from "firebase/firestore";
import { POSTS_SIZE } from "../config";

export function useFollowedPosts(currentUserId, pageSize = POSTS_SIZE) {
  const { following, loadingFollowing } = useFollow(currentUserId);
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(
    async (loadMore = false) => {
      if (loadingFollowing || !hasMore) return;

      if (following.length > 0) {
        setLoading(true);
        try {
          let postsQuery = query(
            collection(db, "posts"),
            where("uid", "in", following),
            orderBy("date", "desc"),
            limit(pageSize)
          );

          if (loadMore && lastVisible) {
            postsQuery = query(postsQuery, startAfter(lastVisible));
          }

          const querySnapshot = await getDocs(postsQuery);
          const postsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setPosts((prev) => (loadMore ? [...prev, ...postsData] : postsData));
          setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

          if (postsData.length < pageSize) {
            setHasMore(false);
          }
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    },
    [following, loadingFollowing, lastVisible, pageSize, hasMore]
  );

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [following, loadingFollowing]);

  return { posts, isLoading, error, fetchPosts, hasMore };
}
