/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const AddComment = ({ currentUserId, postId, addComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      await addComment(currentUserId, postId, newComment);
      setNewComment("");
    }
  };

  return (
    <Box maxWidth="576px" paddingTop={3} paddingBottom={3}>
      <Typography variant="h6" component="h4" fontWeight="bold">
        Escribe un comentario
      </Typography>
      <form onSubmit={handleCommentSubmit}>
        <Stack
          sx={{ mt: 1 }}
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
  );
};

export default AddComment;
