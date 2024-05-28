/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import LikeButton from "./Interaction/LikeButton";
import CommentButton from "./Interaction/CommentButton";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function InteractionBar({ postId }) {
  const [commentsCount, setCommentsCount] = useState(0);
  const db = getFirestore();

  useEffect(() => {
    const fetchCommentsCount = async () => {
      try {
        const commentsCollectionRef = collection(db, "comments");
        const q = query(commentsCollectionRef, where("postId", "==", postId));
        const querySnapshot = await getDocs(q);
        setCommentsCount(querySnapshot.size);
      } catch (error) {
        console.error("Error fetching comments count: ", error);
      }
    };

    fetchCommentsCount();
  }, [postId, db]);

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "85%", px: 2, pt: 0, pb: 2 }}
      >
        <LikeButton postId={postId} />
        <CommentButton commentsCount={commentsCount} postId={postId} />
      </Stack>
    </div>
  );
}
