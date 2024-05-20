import { Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

export default function FollowToggleButton() {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleToggle = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <Chip
      sx={{ marginLeft: 1 }}
      icon={isFollowing ? <CheckIcon /> : <AddIcon />}
      size="small"
      label={isFollowing ? "Siguiendo" : "Seguir"}
      //   color={isFollowing ? "success" : "warning"}
      color="info"
      onClick={handleToggle}
    />
  );
}
