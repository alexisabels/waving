/* eslint-disable react/prop-types */
import { Box, CircularProgress, Typography } from "@mui/material";
import Comment from "./Comment";

const CommentsList = ({ comments, loading }) => {
  return (
    <Box>
      <Typography variant="h6" component="h4" fontWeight="bold">
        Comentarios
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      )}
    </Box>
  );
};

export default CommentsList;
