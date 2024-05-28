import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  serverTimestamp,
  getDocs,
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
        const commentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, db]);

  const addComment = async (userId, text) => {
    try {
      const commentsCollectionRef = collection(db, "comments");
      await addDoc(commentsCollectionRef, {
        postId,
        date: serverTimestamp(),
        text,
        uid: userId,
      });
      setComments((prevComments) => [
        ...prevComments,
        { postId, date: new Date(), text, uid: userId },
      ]);
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  return {
    comments,
    loading,
    addComment,
  };
};

export default useComment;
