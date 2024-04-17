/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import Post from './index.jsx'
export default function PostsLists({ posts, isLoading }) {
    if (isLoading) {
        return <Typography textAlign="center">Cargando posts...</Typography>;
      }
  return (
    
    <Box
      sx={{
        width: "100%",
        my: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {posts?.length === 0 ? (
        <Typography fontSize="large" textAlign="center">
          Sin posts de momento...
        </Typography>
      ) : (
        posts?.map((post) => <Post key={post.id} post={post} />)
      )}
    </Box>
  );
}
