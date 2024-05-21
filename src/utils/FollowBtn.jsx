// components/FollowBtn.jsx
/* eslint-disable react/prop-types */
import { Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { useState, useEffect } from "react";
import { useFollow } from "../hooks/useFollow";

export default function FollowBtn({ currentUserId, targetUserId }) {
  const { following, followUser, unfollowUser } = useFollow(currentUserId);
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

  //no renderizarlo si el user es el msmo
  if (currentUserId === targetUserId) {
    return null;
  }

  return (
    <Chip
      sx={{ marginLeft: 1.25 }}
      icon={isFollowing ? <CheckIcon /> : <AddIcon />}
      size="small"
      label={isFollowing ? "Siguiendo" : "Seguir"}
      color={isFollowing ? "success" : "warning"}
      onClick={handleToggle}
    />
  );
}
