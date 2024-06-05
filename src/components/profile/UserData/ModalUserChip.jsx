/* eslint-disable react/prop-types */
import { Avatar, Box, Stack, Typography } from "@mui/material";
import FollowToggleButton from "../../../utils/FollowBtn";
import { useNavigate } from "react-router-dom";
import { PROTECTED } from "../../../lib/routes";

export default function ModalUserChip({ user, currentUserId, onClose }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClose) {
      onClose();
    }
    navigate(`${PROTECTED}/profile/${user.username}`);
    window.location.reload();
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 1.5,
        borderColor: "#223C43",
        display: "flex",
        alignItems: "center",
        width: "90%",
        mb: 1,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Stack direction="row" alignItems="center">
          <Avatar
            sx={{ width: 38, height: 38, color: "white", mr: 1.5 }}
            onClick={handleClick}
            src={user?.avatar}
          />
          <Box>
            <Typography
              variant="body1"
              component="span"
              noWrap
              sx={{
                color: "black",
                textDecoration: "none",
                cursor: "pointer",
              }}
              onClick={handleClick}
            >
              {user.username || "Desconocido"}
            </Typography>
          </Box>
        </Stack>
        <FollowToggleButton
          currentUserId={currentUserId}
          targetUserId={user.id}
        />
      </Stack>
    </Box>
  );
}
