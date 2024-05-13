import { useState } from "react";
import {
  ChatBubble,
  ChatBubbleOutlineRounded,
  FavoriteBorder,
  FavoriteRounded,
} from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

export default function InteractionBar() {
  const [hoverFavorite, setHoverFavorite] = useState(false);
  const [hoverComment, sethoverComment] = useState(false);

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "85%", px: 2, pt: 0, pb: 2 }}
      >
        {/* Likes */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer",
          }}
          onMouseEnter={() => setHoverFavorite(true)}
          onMouseLeave={() => setHoverFavorite(false)}
        >
          {hoverFavorite ? (
            <FavoriteRounded fontSize="small" style={{ color: "red" }} />
          ) : (
            <FavoriteBorder fontSize="small" />
          )}
          <Typography
            variant="body1"
            sx={{ display: "inline" }}
            fontSize="smaller"
          >
            67
          </Typography>
        </Box>
        {/* Comentarios */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer",
          }}
          onMouseEnter={() => sethoverComment(true)}
          onMouseLeave={() => sethoverComment(false)}
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
            14
          </Typography>
        </Box>
      </Stack>
    </div>
  );
}
