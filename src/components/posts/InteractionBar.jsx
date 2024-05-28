/* eslint-disable react/prop-types */
import { Stack } from "@mui/material";
import LikeButton from "./Interaction/LikeButton";
import CommentButton from "./Interaction/CommentButton";

export default function InteractionBar({ postId, commentsCount }) {
  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "85%", px: 2, pt: 0, pb: 2 }}
      >
        <LikeButton postId={postId} />
        <CommentButton commentsCount={commentsCount} />
      </Stack>
    </div>
  );
}
