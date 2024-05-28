/* eslint-disable react/prop-types */
import { Box, Typography, Avatar, Chip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Comment = ({ comment, currentUser, onDelete }) => {
  const isCommentAuthor = currentUser?.id === comment.uid;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
        p: 1.5,
        bgcolor: "#f0f0f0",
        borderRadius: 2,
      }}
    >
      <Chip
        avatar={<Avatar alt={comment.uid} src={comment.userAvatar} />}
        label={comment.uid}
        sx={{ mr: 1 }}
      />
      <Typography variant="body2" sx={{ flexGrow: 1 }}>
        {comment.text}
      </Typography>
      {isCommentAuthor && (
        <IconButton
          edge="end"
          aria-label="delete"
          size="small"
          onClick={() => onDelete(comment.id)}
        >
          <DeleteIcon fontSize="small" color="error" />
        </IconButton>
      )}
    </Box>
  );
};

export default Comment;
