import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  query,
  setDoc,
  doc,
  orderBy,
  deleteDoc,
  where,
  limit,
  startAfter,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { POSTS_SIZE } from "../config";
export function useAddPost() {
  const [isLoading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  async function addPost(post) {
    try {
      // para evitar posts en blanco
      if (!post.text.trim()) {
        throw new Error("El contenido del post no puede estar vacío.");
      }

      const cleanedPost = {
        ...post,
        text: post.text.trim().replace(/\s+$/, ""),
      };

      setLoading(true);
      const docRef = await addDoc(collection(db, "posts"), {
        ...cleanedPost,
        date: Date.now(),
        likes: [],
      });
      await setDoc(
        doc(db, "posts", docRef.id),
        { id: docRef.id },
        { merge: true }
      );

      console.log("Post publicado con ID: ", docRef.id);
      setSnackbarMessage("Post publicado correctamente");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (e) {
      setSnackbarMessage("Error al publicar el post: " + e.message);
      console.error("Error al publicar el post: ", e);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  }

  return {
    addPost,
    isLoading,
    openSnackbar,
    setOpenSnackbar,
    snackbarMessage,
    snackbarSeverity,
  };
}

export function usePosts(pageSize = POSTS_SIZE) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      orderBy("date", "desc"),
      limit(pageSize)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(newPosts);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setIsLoading(false);
        setHasMore(newPosts.length === pageSize);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      }
    );

    // "desuscribirse" al desmontar compnente
    return () => unsubscribe();
  }, [pageSize]);

  const fetchMorePosts = async () => {
    if (!hasMore) return;

    setIsLoading(true);
    try {
      const q = query(
        collection(db, "posts"),
        orderBy("date", "desc"),
        startAfter(lastVisible),
        limit(pageSize)
      );

      const querySnapshot = await getDocs(q);
      const newPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts((prev) => [...prev, ...newPosts]);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      if (newPosts.length < pageSize) {
        setHasMore(false);
      }
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  };

  return { posts, isLoading, error, fetchMorePosts, hasMore };
}

export function useUserPosts(uid = null, pageSize = POSTS_SIZE) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (loadMore = false) => {
    if (!hasMore) return;
    setIsLoading(true);
    try {
      let q = query(
        collection(db, "posts"),
        where("uid", "==", uid),
        orderBy("date", "desc"),
        limit(pageSize)
      );

      if (loadMore && lastVisible) {
        q = query(q, startAfter(lastVisible));
      }

      const querySnapshot = await getDocs(q);
      const newPosts = querySnapshot.docs.map((doc) => doc.data());
      setPosts((prev) => (loadMore ? [...prev, ...newPosts] : newPosts));
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

      if (newPosts.length < pageSize) {
        setHasMore(false);
      }
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (uid) {
      fetchPosts();
    }
  }, [uid]);

  return { posts, isLoading, error, fetchPosts, hasMore };
}

export function useDeletePost() {
  const [isLoading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  async function deletePost(postId) {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "posts", postId));
      setSnackbarMessage("Post eliminado correctamente");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (e) {
      setSnackbarMessage("Error al eliminar el post: " + e.message);
      console.error("Error al eliminar el post: ", e);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  }

  return {
    deletePost,
    isLoading,
    openSnackbar,
    setOpenSnackbar,
    snackbarMessage,
    snackbarSeverity,
  };
}
