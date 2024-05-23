/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import Post from "./index";
import { useAuth } from "../../hooks/auth";

export default function PostsLists({ posts, isLoading }) {
  const { user } = useAuth();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
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
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          mx: "auto",
          mt: 2,
          mb: 9,
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
          posts?.map((post) =>
            post.id ? (
              <Post
                key={post.id}
                post={post}
                currentUser={user}
                showSnackbar={showSnackbar}
              />
            ) : null,
          )
        )}
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "60%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
