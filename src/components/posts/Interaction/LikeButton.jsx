/* eslint-disable react/prop-types */
import { FavoriteBorder, FavoriteRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useLike } from "../../../hooks/useLike";

const LikeButton = ({ postId }) => {
  const { likes, hasLiked, addLike, removeLike } = useLike(postId);

  const handleLike = () => {
    if (hasLiked) {
      removeLike();
    } else {
      addLike();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        cursor: "pointer",
        "&:hover .icon": {
          color: "red",
        },
      }}
      onClick={handleLike}
    >
      {hasLiked ? (
        <FavoriteRounded
          className="icon"
          fontSize="small"
          style={{ color: "red" }}
        />
      ) : (
        <FavoriteBorder className="icon" fontSize="small" />
      )}
      <Typography variant="body1" sx={{ display: "inline" }} fontSize="smaller">
        {likes.length}
      </Typography>
    </Box>
  );
};

export default LikeButton;
