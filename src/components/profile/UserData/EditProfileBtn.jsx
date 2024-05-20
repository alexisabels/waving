import { Button } from "@mui/material";

// eslint-disable-next-line react/prop-types, no-unused-vars
function EditProfileBtn({ user }) {
  return (
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
      Editar perfil (próximamente)
    </Button>
  );
}

export default EditProfileBtn;
