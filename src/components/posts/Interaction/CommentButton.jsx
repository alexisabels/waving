/* eslint-disable react/prop-types */
import { ChatBubbleOutlineRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const CommentButton = ({ commentsCount }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        cursor: "pointer",
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
