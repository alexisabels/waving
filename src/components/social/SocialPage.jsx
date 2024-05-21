// components/SocialPage.jsx
import { Box } from "@mui/material";
import SuggestedUsersList from "./SuggestedUsers/SuggestedUsersList";
import FollowedPostsFeed from "./FollowedPostsFeed";

export default function SocialPage() {
  return (
    <div>
      <Box maxWidth="600px" mx="auto">
        <h1>Social</h1>
        <h3>Siguiendo</h3>
        <SuggestedUsersList />
        <h2>De tus seguidos</h2>
        <FollowedPostsFeed />
      </Box>
    </div>
  );
}
