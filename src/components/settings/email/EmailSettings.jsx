import { Box } from "@mui/material";
import UpdateEmail from "./UpdateEmail";
import VerifyEmail from "./VerifyEmail";

export default function EmailSettings() {
  return (
    <Box sx={{ maxWidth: 400 }}>
      <VerifyEmail />
      {/* si el mail está verificado no se renderiza el componente VerifyEmail */}
      <UpdateEmail />
    </Box>
  );
}
