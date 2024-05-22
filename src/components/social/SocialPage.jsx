import { Box } from "@mui/material";
import FollowedUsersList from "./FollowedUsers/FollowedUsersList";
import FollowedPostsFeed from "./FollowedPostsFeed";

export default function SocialPage() {
  return (
    <div>
      <Box maxWidth="600px" mx="auto">
        <h1>Social</h1>
        <h3>Siguiendo</h3>
        <FollowedUsersList />
        <h2>De tus seguidos</h2>
        <FollowedPostsFeed />
      </Box>
    </div>
  );
}
