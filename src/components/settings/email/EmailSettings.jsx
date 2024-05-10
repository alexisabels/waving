import { Box } from "@mui/material";
import UpdateEmail from "./UpdateEmail";
import VerifyEmail from "./VerifyEmail";

export default function EmailSettings() {
  return (
    <Box sx={{ maxWidth: 400 }}>
      <VerifyEmail />
      <UpdateEmail />
    </Box>
  );
}
