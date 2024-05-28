/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Post from "../posts/";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../../hooks/auth";
import useComment from "../../hooks/useComment";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export default function PostPage({ showSnackbar }) {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const { user: currentUser } = useAuth();
  const { comments, loading: loadingComments, addComment } = useComment(postId);
  const [newComment, setNewComment] = useState("");

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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      await addComment(currentUser.id, newComment);
      setNewComment("");
    }
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
      <Typography variant="h6" component="h4" fontWeight="bold">
        Escribe un comentario
      </Typography>
      <Box maxWidth="576px" paddingTop={3} paddingBottom={3}>
        <form onSubmit={handleCommentSubmit}>
          <Stack
            spacing={2}
            direction="row-reverse"
            justifyContent="space-between"
          >
            <Button
              variant="contained"
              size="medium"
              type="submit"
              style={{
                borderRadius: 20,
                textTransform: "none",
                backgroundColor: "#223C43",
                width: "100px",
              }}
            >
              Post
            </Button>
            <TextField
              minRows="1"
              placeholder="Escribe un nuevo comentario..."
              multiline
              fullWidth
              margin="normal"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              InputProps={{
                sx: {
                  color: "white",
                  borderRadius: 10,
                  p: 1.5,
                  bgcolor: "#223C43",
                  borderColor: "#223C43",
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                    border: "none",
                  },
                },
              }}
            />
          </Stack>
        </form>
      </Box>
      <Box>
        <Typography variant="h6" component="h4" fontWeight="bold">
          Comentarios
        </Typography>
        {loadingComments ? (
          <CircularProgress />
        ) : (
          comments.map((comment) => (
            <Box
              key={comment.id}
              sx={{ mb: 2, p: 2, bgcolor: "#f0f0f0", borderRadius: 2 }}
            >
              <Typography variant="body2">{comment.text}</Typography>
              <Typography variant="caption" color="textSecondary">
                por {comment.uid} -{" "}
                {new Date(comment.date.seconds * 1000).toLocaleString()}
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
