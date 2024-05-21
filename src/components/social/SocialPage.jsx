import { Box } from "@mui/material";
import SuggestedUsersList from "./SuggestedUsers/SuggestedUsersList";

export default function SocialPage() {
  return (
    <div>
      <Box maxWidth="600px" mx="auto">
        <h1>Social</h1>
        <h3>Siguiendo</h3>
        <SuggestedUsersList />
        <h3>Tu feed</h3>
        <h5>En construcción...</h5>
      </Box>
    </div>
  );
}
