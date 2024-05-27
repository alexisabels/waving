/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Chip,
  Stack,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { useState } from "react";
import FollowingModal from "./Following/FollowingModal";
import FollowersModal from "./Followers/FollowersModal";
import EditProfileBtn from "./EditProfileBtn";
import { auth } from "../../../lib/firebase";
import { useFollow } from "../../../hooks/useFollow";
import BigFollowBtn from "../../../utils/BigFollowBtn";
import EditProfileModal from "../EditProfileModal";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        gap={1}
        marginBottom={3}
      >
        <Box maxWidth="50%">
          <Typography
            variant="h4"
            component="h4"
            fontWeight="bold"
            marginBottom={1}
          >
            @{user.username}
          </Typography>

          {/* {currentUser?.uid === user.id && <EditProfileBtn user={user} />} */}
          <Typography
            variant="p"
            component="p"
            fontWeight="lighter"
            marginTop={1}
          >
            se unió el {formattedDate}
          </Typography>
          <Stack
            alignItems="center"
            justifyContent="left"
            direction="row"
            gap={1}
            marginTop={2}
          >
            <Tooltip
              title="Ver todos los seguidores"
              TransitionComponent={Zoom}
            >
              <Chip
                label={
                  loadingFollowers
                    ? "Cargando..."
                    : `${followers.length} seguidores`
                }
                onClick={() => setModalFollowersOpen(true)}
              />
            </Tooltip>
            <Tooltip title="Ver todos los seguidos" TransitionComponent={Zoom}>
              <Chip
                label={
                  loadingFollowing
                    ? "Cargando..."
                    : `${following.length} siguiendo`
                }
                onClick={() => setModalFollowingOpen(true)}
              />
            </Tooltip>
          </Stack>
        </Box>
        <Stack alignItems="center" direction="column" gap={1}>
          <Avatar sx={{ width: 100, height: 100 }} src={user?.avatar} />
          <BigFollowBtn
            currentUserId={currentUser.uid}
            targetUserId={user.id}
          />
          {currentUser?.uid === user.id && (
            <>
              <EditProfileBtn onClick={handleOpenModal} />
              <EditProfileModal
                open={isModalOpen}
                handleClose={handleCloseModal}
                currentUserId={user.id}
              />
            </>
          )}
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
