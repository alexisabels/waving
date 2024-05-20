/* eslint-disable react/prop-types */
import { Box, Divider, Modal, Typography } from "@mui/material";
import FollowingList from "./FollowingList";

export default function FollowingModal({
  // eslint-disable-next-line no-unused-vars
  user,
  modalFollowingOpen,
  setModalFollowingOpen,
}) {
  // const [following, setFollowing] = useUser()
  return (
    <Modal
      open={modalFollowingOpen}
      onClose={() => setModalFollowingOpen(false)}
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
        <FollowingList users={user} />
      </Box>
    </Modal>
  );
}
