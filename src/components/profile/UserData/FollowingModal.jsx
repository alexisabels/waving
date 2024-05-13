/* eslint-disable react/prop-types */
import { Box, Modal, Typography } from "@mui/material";

// Cambia la firma de la función para recibir props como un objeto
export default function FollowingModal({
  modalFollowingOpen,
  setModalFollowingOpen,
}) {
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
          maxWidth: 300,
          textAlign: "center",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Siguiendo
        </Typography>
      </Box>
    </Modal>
  );
}
