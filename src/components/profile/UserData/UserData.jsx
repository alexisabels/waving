/* eslint-disable react/prop-types */
import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import { useState } from "react";
import FollowingModal from "./FollowingModal";
import FollowersModal from "./FollowersModal";

export default function UserData({ user }) {
  const formattedDate = new Date(user.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [modalFollowersOpen, setModalFollowersOpen] = useState(false);
  const [modalFollowingOpen, setModalFollowingOpen] = useState(false);

  return (
    <div>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        gap={1}
      >
        <Box maxWidth="50%">
          <Typography variant="h4" component="h4" fontWeight="bold">
            {user.username}
          </Typography>
          Fecha de registro: {formattedDate}
          <Stack
            alignItems="center"
            justifyContent="left"
            direction="row"
            gap={1}
            marginTop={2}
          >
            <Chip
              label="13 seguidores"
              onClick={() => setModalFollowersOpen(true)}
            />
            <Chip
              label="21 siguiendo"
              onClick={() => setModalFollowingOpen(true)}
            />
          </Stack>
        </Box>
        <Avatar sx={{ width: 100, height: 100 }} />
      </Stack>
      <FollowingModal
        modalFollowingOpen={modalFollowingOpen}
        setModalFollowingOpen={setModalFollowingOpen}
      />
      <FollowersModal
        modalFollowersOpen={modalFollowersOpen}
        setModalFollowersOpen={setModalFollowersOpen}
      />
    </div>
  );
}
