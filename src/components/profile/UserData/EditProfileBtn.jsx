import { Button, Tooltip, Zoom } from "@mui/material";

// eslint-disable-next-line react/prop-types, no-unused-vars
function EditProfileBtn({ user }) {
  return (
    <Tooltip
      title="Esta función no está disponible por ahora"
      TransitionComponent={Zoom}
    >
      <span>
        <Button
          variant="contained"
          size="small"
          type="submit"
          fullWidth
          disabled
          // hasta que funcione
          style={{
            borderRadius: 20,
            textTransform: "none",
            // backgroundColor: "#223C43",
          }}
        >
          Editar perfil (próx.)
        </Button>
      </span>
    </Tooltip>
  );
}

export default EditProfileBtn;
