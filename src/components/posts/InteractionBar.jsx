/* eslint-disable react/prop-types */
import { useState } from "react";
import { ChatBubble, ChatBubbleOutlineRounded } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import LikeButton from "./Interaction/LikeButton";

export default function InteractionBar({ postId, commentsCount }) {
  const [hoverComment, setHoverComment] = useState(false);

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "85%", px: 2, pt: 0, pb: 2 }}
      >
        {/* Likes */}
        <LikeButton postId={postId} />

        {/* Comentarios */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer",
          }}
          onMouseEnter={() => setHoverComment(true)}
          onMouseLeave={() => setHoverComment(false)}
        >
          {hoverComment ? (
            <ChatBubble fontSize="small" style={{ color: "#223C43" }} />
          ) : (
            <ChatBubbleOutlineRounded fontSize="small" />
          )}
          <Typography
            variant="body1"
            sx={{ display: "inline" }}
            fontSize="smaller"
          >
            {commentsCount}
          </Typography>
        </Box>
      </Stack>
    </div>
  );
}
