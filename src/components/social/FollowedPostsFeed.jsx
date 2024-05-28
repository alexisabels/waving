/* eslint-disable react/prop-types */
import { useFollowedPosts } from "../../hooks/useFollowedPosts";
import PostsLists from "../posts/PostsLists";
import { useAuth } from "../../hooks/auth";
import { CircularProgress, Typography } from "@mui/material";

export default function FollowedPostsFeed() {
  const { user } = useAuth();
  const { posts, isLoading, fetchPosts, hasMore } = useFollowedPosts(user?.id);

  const fetchMorePosts = () => {
    fetchPosts(true);
  };

  if (isLoading) {
    return (
      <Typography textAlign="center">
        <CircularProgress sx={{ color: "#223C43" }} size={50} />
        <br />
        Cargando posts...
      </Typography>
    );
  }

  return (
    <div>
      <PostsLists
        posts={posts}
        isLoading={isLoading}
        fetchMorePosts={fetchMorePosts}
        hasMore={hasMore}
      />
    </div>
  );
}
