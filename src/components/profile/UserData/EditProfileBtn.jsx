import { Button } from "@mui/material";

function EditProfileBtn({ user }) {
  return (
    <Button
      variant="contained"
      size="small"
      type="submit"
      fullWidth
      style={{
        borderRadius: 20,
        textTransform: "none",
        backgroundColor: "#223C43",
      }}
    >
      Editar perfil
    </Button>
  );
}

export default EditProfileBtn;
