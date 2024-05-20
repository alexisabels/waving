/* eslint-disable react/prop-types */
import { Box, Divider, Modal, Typography } from "@mui/material";
import FollowersList from "./FollowersList";

export default function FollowersModal({
  // eslint-disable-next-line no-unused-vars
  user,
  modalFollowersOpen,
  setModalFollowersOpen,
}) {
  // const [followers, setFollowers] = useUser()
  return (
    <Modal
      open={modalFollowersOpen}
      onClose={() => setModalFollowersOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          minWidth: 300,
          maxWidth: 300,
          textAlign: "center",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Seguidores
        </Typography>
        <Divider variant="fullWidth" sx={{ mt: 1, mb: 2 }} />
        <FollowersList users={user} />
      </Box>
    </Modal>
  );
}
