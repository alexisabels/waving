/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
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
  
  // Estado para el Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  
  // Verificar si hay mensaje de login al montar el componente
  useEffect(() => {
    const showMessage = localStorage.getItem("showLoginMessage");
    if (showMessage === "true") {
      const message = localStorage.getItem("loginMessage");
      setSnackbarMessage(message || "Sesión iniciada correctamente");
      setOpenSnackbar(true);
      // Limpiar después de mostrar
      localStorage.removeItem("showLoginMessage");
    }
  }, []);
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

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
      
      {/* Snackbar para mostrar mensaje de inicio de sesión */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
