import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

const useComment = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const commentsCollectionRef = collection(db, "comments");
        const q = query(commentsCollectionRef, where("postId", "==", postId));
        const querySnapshot = await getDocs(q);

        const commentsData = await Promise.all(
          querySnapshot.docs.map(async (commentDoc) => {
            const commentData = commentDoc.data();
            const userRef = doc(db, "users", commentData.uid);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.exists() ? userSnap.data() : {};

            return {
              id: commentDoc.id,
              ...commentData,
              userName: userData.username || "Usuario desconocido",
              userAvatar: userData.avatar || "",
            };
          })
        );

        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, db]);

  const addComment = async (userId, postId, text) => {
    try {
      const commentsCollectionRef = collection(db, "comments");
      const docRef = await addDoc(commentsCollectionRef, {
        postId,
        date: serverTimestamp(),
        text,
        uid: userId,
      });
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.exists() ? userSnap.data() : {};

      setComments((prevComments) => [
        ...prevComments,
        {
          id: docRef.id,
          postId,
          date: new Date(),
          text,
          uid: userId,
          userName: userData.username || "Usuario desconocido",
          userAvatar: userData.avatar || "",
        },
      ]);
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await deleteDoc(doc(db, "comments", commentId));
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  return {
    comments,
    loading,
    addComment,
    deleteComment,
    setComments,
  };
};

export default useComment;
