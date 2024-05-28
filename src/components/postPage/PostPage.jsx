/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Post from "../posts/";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../../hooks/auth";
import useComment from "../../hooks/useComment";
import { Box } from "@mui/material";
import AddComment from "./components/AddComment";
import CommentsList from "./components/CommentsList";

export default function PostPage({ showSnackbar }) {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const { user: currentUser } = useAuth();
  const {
    comments,
    loading: loadingComments,
    addComment,
    deleteComment,
    setComments,
  } = useComment(postId);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "posts", postId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("error al fetch el post");
        }
      } catch (error) {
        console.error("Error fetching post: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, db]);

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box maxWidth="600px" mx="auto">
      {post && (
        <Post
          key={post.id}
          post={post}
          currentUser={currentUser}
          showSnackbar={showSnackbar}
        />
      )}
      <AddComment
        currentUserId={currentUser?.id}
        postId={postId}
        addComment={addComment}
      />
      <CommentsList
        comments={comments}
        loading={loadingComments}
        currentUser={currentUser}
        onDelete={handleDeleteComment}
      />
    </Box>
  );
}
