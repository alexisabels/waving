import { Box } from "@mui/material";
import SuggestedUsersList from "./SuggestedUsers/SuggestedUsersList";

export default function SocialPage() {
  return (
    <div>
      <Box maxWidth="600px" mx="auto">
        <h1>Social</h1>
        <h3>Sugerencias</h3>
        <SuggestedUsersList />
        <h3>Posts de tus seguidos</h3>
        <h5>En construcción...</h5>
      </Box>
    </div>
  );
}
