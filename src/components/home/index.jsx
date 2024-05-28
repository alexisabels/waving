/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { usePosts } from "../../hooks/post";
import PostsLists from "../posts/PostsLists";
import NewPost from "./NewPost";

export default function Home() {
  const {
    posts,
    isLoading: postsLoading,
    fetchMorePosts,
    hasMore,
  } = usePosts();

  return (
    <Box maxWidth="600px" mx="auto">
      <NewPost />
      <Typography variant="h4" component="h4" fontWeight="bold">
        Últimos Posts
      </Typography>
      <PostsLists
        posts={posts}
        isLoading={postsLoading}
        fetchMorePosts={fetchMorePosts}
        hasMore={hasMore}
      />
    </Box>
  );
}
