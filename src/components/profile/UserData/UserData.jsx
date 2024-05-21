/* eslint-disable react/prop-types */
// components/UserData/UserData.jsx
import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import { useState } from "react";
import FollowingModal from "./Following/FollowingModal";
import FollowersModal from "./Followers/FollowersModal";
import EditProfileBtn from "./EditProfileBtn";
import { auth } from "../../../lib/firebase";
import { useFollow } from "../../../hooks/useFollow";
import BigFollowBtn from "../../../utils/BigFollowBtn";

export default function UserData({ user }) {
  const formattedDate = new Date(user.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [modalFollowersOpen, setModalFollowersOpen] = useState(false);
  const [modalFollowingOpen, setModalFollowingOpen] = useState(false);
  const currentUser = auth.currentUser;
  const { followers, following, loadingFollowers, loadingFollowing } =
    useFollow(user.id);

  return (
    <div>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        gap={1}
        marginBottom={3}
      >
        <Stack alignItems="flex-start" gap={1}>
          <Typography
            variant="h4"
            component="h4"
            fontWeight="bold"
            marginBottom={1}
          >
            @{user.username}
          </Typography>
          <Typography
            variant="p"
            component="p"
            fontWeight="lighter"
            marginTop={1}
          >
            se unió el {formattedDate}
          </Typography>
          <Stack alignItems="center" direction="row" gap={1} marginTop={2}>
            <Chip
              label={
                loadingFollowers
                  ? "Cargando..."
                  : `${followers.length} seguidores`
              }
              onClick={() => setModalFollowersOpen(true)}
            />
            <Chip
              label={
                loadingFollowing
                  ? "Cargando..."
                  : `${following.length} siguiendo`
              }
              onClick={() => setModalFollowingOpen(true)}
            />
          </Stack>
        </Stack>
        <Stack alignItems="center" direction="column" gap={1}>
          <Avatar sx={{ width: 100, height: 100 }} />
          <BigFollowBtn
            currentUserId={currentUser.uid}
            targetUserId={user.id}
          />
          {currentUser?.uid === user.id && <EditProfileBtn user={user} />}
        </Stack>
      </Stack>
      <FollowingModal
        modalFollowingOpen={modalFollowingOpen}
        setModalFollowingOpen={setModalFollowingOpen}
        user={user}
      />
      <FollowersModal
        modalFollowersOpen={modalFollowersOpen}
        setModalFollowersOpen={setModalFollowersOpen}
        user={user}
      />
    </div>
  );
}
