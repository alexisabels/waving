/* eslint-disable react/prop-types */
import { Chip, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { useState, useEffect } from "react";
import { useFollow } from "../hooks/useFollow";

export default function FollowBtn({ currentUserId, targetUserId }) {
  const { following, followUser, unfollowUser, loadingFollowing } =
    useFollow(currentUserId);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setIsFollowing(following.includes(targetUserId));
  }, [following, targetUserId]);

  const handleToggle = () => {
    if (isFollowing) {
      unfollowUser(targetUserId);
    } else {
      followUser(targetUserId);
    }
    setIsFollowing(!isFollowing);
  };

  // no renderizarlo si el user es el mismo
  if (currentUserId === targetUserId) {
    return null;
  }

  if (loadingFollowing) {
    return (
      <Chip
        sx={{ marginLeft: 1.25 }}
        icon={<CircularProgress size="1rem" />}
        size="small"
        label="Cargando..."
        color="default"
      />
    );
  }

  return (
    <Chip
      sx={{ marginLeft: 1.25 }}
      icon={isFollowing ? <CheckIcon /> : <AddIcon />}
      size="small"
      label={isFollowing ? "Siguiendo" : "Seguir"}
      color={isFollowing ? "warning" : "success"}
      onClick={handleToggle}
    />
  );
}
