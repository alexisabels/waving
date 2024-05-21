// components/FollowBtn.jsx
/* eslint-disable react/prop-types */
import { Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { useState, useEffect } from "react";
import { useFollow } from "../hooks/useFollow";

export default function BigFollowBtn({ currentUserId, targetUserId }) {
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
      icon={isFollowing ? <CheckIcon /> : <AddIcon />}
      size="medium"
      label={isFollowing ? "Siguiendo" : "Seguir"}
      color={isFollowing ? "warning" : "success"}
      onClick={handleToggle}
    />
  );
}
