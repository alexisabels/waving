// hooks/useFollow.jsx
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import {
  doc,
  setDoc,
  updateDoc,
  collection,
  query,
  getDocs,
  increment,
  deleteDoc,
} from "firebase/firestore";

export function useFollow(uid) {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uid) {
      setError("No se ha proporcionado un UID");
      setLoading(false);
      return;
    }

    const fetchFollowData = async () => {
      setLoading(true);
      try {
        // Obtener la lista de seguidos
        const followingQuery = query(
          collection(db, "following", uid, "myFollowing")
        );
        const followingSnapshot = await getDocs(followingQuery);
        const followingList = followingSnapshot.docs.map((doc) => doc.id);

        // Obtener la lista de seguidores
        const followersQuery = query(
          collection(db, "followers", uid, "myFollowers")
        );
        const followersSnapshot = await getDocs(followersQuery);
        const followersList = followersSnapshot.docs.map((doc) => doc.id);

        setFollowing(followingList);
        setFollowers(followersList);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener la lista de seguidores/seguidos:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchFollowData();
  }, [uid]);

  const followUser = async (targetUserId) => {
    try {
      const currentUserRef = doc(db, "users", uid);
      const targetUserRef = doc(db, "users", targetUserId);

      await setDoc(doc(db, "following", uid, "myFollowing", targetUserId), {
        followedAt: new Date(),
      });

      await setDoc(doc(db, "followers", targetUserId, "myFollowers", uid), {
        followedAt: new Date(),
      });

      await updateDoc(currentUserRef, {
        followingCount: increment(1),
      });

      await updateDoc(targetUserRef, {
        followersCount: increment(1),
      });

      setFollowing((prev) => [...prev, targetUserId]);
    } catch (err) {
      console.error("Error al seguir al usuario:", err);
      setError(err);
    }
  };

  const unfollowUser = async (targetUserId) => {
    try {
      const currentUserRef = doc(db, "users", uid);
      const targetUserRef = doc(db, "users", targetUserId);

      await deleteDoc(doc(db, "following", uid, "myFollowing", targetUserId));

      await deleteDoc(doc(db, "followers", targetUserId, "myFollowers", uid));

      await updateDoc(currentUserRef, {
        followingCount: increment(-1),
      });

      await updateDoc(targetUserRef, {
        followersCount: increment(-1),
      });

      setFollowing((prev) => prev.filter((id) => id !== targetUserId));
    } catch (err) {
      console.error("Error al dejar de seguir al usuario:", err);
      setError(err);
    }
  };

  return { following, followers, loading, error, followUser, unfollowUser };
}
