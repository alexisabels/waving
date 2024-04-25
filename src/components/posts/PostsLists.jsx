/* eslint-disable react/prop-types */
import { Box, CircularProgress, Typography } from "@mui/material";
import Post from "./index.jsx";
export default function PostsLists({ posts, isLoading }) {
  if (isLoading) {
    return (
      <Typography textAlign="center">
        <CircularProgress sx={{ color: "#223C43" }} size={50} /> <br />
        Cargando posts...
      </Typography>
    );
  }
  return (
    <>
      <Typography
        sx={{ width: "85%", maxWidth: "600px", mx: "auto" }}
        variant="h5"
        component="h5"
        fontWeight="bold"
      >
        Últimos Posts
      </Typography>
      <Box
        sx={{
          width: "85%",
          maxWidth: "600px",
          mx: "auto",

          mt: 1,
          mb: 7,
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
    </>
  );
}
