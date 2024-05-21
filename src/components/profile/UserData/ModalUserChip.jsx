// components/ModalUserChip.jsx
/* eslint-disable react/prop-types */
import { Avatar, Box, Stack, Typography } from "@mui/material";
import FollowToggleButton from "../../posts/FollowBtn";
import { Link } from "react-router-dom";
import { PROTECTED } from "../../../lib/routes";

export default function ModalUserChip({ user, currentUserId, onClose }) {
  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
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
            component={Link}
            to={`${PROTECTED}/profile/${user.username}`}
            onClick={handleCloseModal}
          />{" "}
          <Box>
            <Typography
              variant="body1"
              component={Link}
              noWrap
              to={`${PROTECTED}/profile/${user.username}`}
              sx={{
                color: "black",
                textDecoration: "none",
              }}
              onClick={handleCloseModal}
            >
              {user.username}
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
