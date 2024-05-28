/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import Post from "./index";
import { useAuth } from "../../hooks/auth";

export default function PostsLists({ posts, isLoading, fetchMorePosts }) {
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

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          mx: "auto",
          mt: 2,
          mb: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLoading && (
          <Typography textAlign="center">
            <CircularProgress sx={{ color: "#223C43" }} size={50} />
            <br />
            Cargando posts...
          </Typography>
        )}
        {posts?.length === 0 && !isLoading ? (
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
            ) : null
          )
        )}
        {posts?.length > 0 && !isLoading && (
          <Button
            onClick={fetchMorePosts}
            variant="outlined"
            sx={{
              mt: 3,
              alignSelf: "center",
              borderRadius: 20,
              textTransform: "none",
              color: "#223C43",
              borderColor: "#223C43",
              "&:hover": {
                borderColor: "#1b2e36",
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            Ver más
          </Button>
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
