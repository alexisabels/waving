/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";

const Comment = ({ comment }) => {
  return (
    <Box sx={{ mb: 2, p: 2, bgcolor: "#f0f0f0", borderRadius: 2 }}>
      <Typography variant="body2">{comment.text}</Typography>
      <Typography variant="caption" color="textSecondary">
        por {comment.uid} -{" "}
        {new Date(comment.date.seconds * 1000).toLocaleString()}
      </Typography>
    </Box>
  );
};

export default Comment;
