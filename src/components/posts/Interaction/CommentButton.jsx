/* eslint-disable react/prop-types */
import { ChatBubbleOutlineRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PROTECTED } from "../../../lib/routes";

const CommentButton = ({ commentsCount, postId }) => {
  return (
    <Box
      component={Link}
      to={`${PROTECTED}/post/${postId}`}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        cursor: "pointer",
        padding: "5px 10px",
        borderRadius: "20px",
        textDecoration: "none",
        color: "#223C43",
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: "#f0f0f0",
        },
        "&:hover .icon": {
          color: "#223C43",
        },
      }}
    >
      <ChatBubbleOutlineRounded className="icon" fontSize="small" />
      <Typography variant="body1" sx={{ display: "inline" }} fontSize="smaller">
        {commentsCount}
      </Typography>
    </Box>
  );
};

export default CommentButton;
