import { useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  query,
  setDoc,
  doc,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

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

      setLoading(true);
      const docRef = await addDoc(collection(db, "posts"), {
        ...post,
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

export function usePosts() {
  const q = query(collection(db, "posts"), orderBy("date", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { posts, isLoading };
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
