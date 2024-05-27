import { Button } from "@mui/material";

// eslint-disable-next-line react/prop-types, no-unused-vars
function EditProfileBtn({ onClick }) {
  return (
    <span>
      <Button
        variant="contained"
        size="small"
        type="button"
        fullWidth
        onClick={onClick}
        style={{
          borderRadius: 20,
          textTransform: "none",
          backgroundColor: "#223C43",
        }}
      >
        Editar perfil
      </Button>
    </span>
  );
}

export default EditProfileBtn;
