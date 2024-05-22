/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useAddPost, usePosts } from "../../hooks/post";
import { useAuth } from "../../hooks/auth";
import PostsLists from "../posts/PostsLists";
import avatarexample from "./../../../public/assets/img/avatarexample.png";
import { Fab, Zoom, useScrollTrigger } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function Characters({ textLength }) {
  const color = textLength > 240 ? "red" : "lightgray";
  const tooltipTitle =
    textLength > 240
      ? "Has superado el límite de caracteres permitido"
      : "Límite de caracteres";
  return (
    <Tooltip title={tooltipTitle}>
      <Typography
        variant="body2"
        style={{ color: color }}
        sx={{
          color: "white",
          userSelect: "none",
          WebkitUserSelect: "none",
          msUserSelect: "none",
          MozUserSelect: "none",
        }}
      >
        {textLength}/240
      </Typography>
    </Tooltip>
  );
}

function NewPost() {
  const { register, handleSubmit, reset, watch } = useForm();
  const [textLength, setTextLength] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const {
    addPost,
    openSnackbar,
    setOpenSnackbar,
    snackbarMessage,
    snackbarSeverity,
  } = useAddPost();
  const { user } = useAuth();

  const textValue = watch("text", "");
  useEffect(() => {
    setTextLength(textValue.length);
    setIsButtonDisabled(textValue.length > 240);
  }, [textValue]);

  async function handleAddPost(data) {
    try {
      await addPost({
        uid: user.id,
        text: data.text,
      });
      reset();
    } catch (e) {
      // No hacer nada aqui, ya que el hook useAddPost maneja el error
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const borderShadowColor =
    textLength > 240
      ? "0 0 0 5px rgba(255, 0, 0, 0.1)"
      : "0 0 0 5px rgba(34, 60, 67, 0.1)";
  return (
    <Box paddingTop={8} paddingBottom={4}>
      <form onSubmit={handleSubmit(handleAddPost)}>
        <Stack spacing={2} direction="row" justifyContent="space-between">
          <Typography variant="h4" component="h4" fontWeight="bold">
            Nuevo Post
          </Typography>
          <Button
            variant="contained"
            size="large"
            type="submit"
            style={{
              borderRadius: 20,
              textTransform: "none",
              backgroundColor: isButtonDisabled ? "grey" : "#223C43",
              width: "100px",
            }}
            disabled={isButtonDisabled}
          >
            Post
          </Button>
        </Stack>
        <TextField
          minRows="1"
          placeholder="Escribe un nuevo post..."
          multiline
          fullWidth
          margin="normal"
          InputProps={{
            sx: {
              color: "white",
              borderRadius: 10,
              p: 2.5,
              bgcolor: "#223C43",
              borderColor: "#223C43",

              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "black",
                border: "none",
                boxShadow: borderShadowColor,
              },
            },
            startAdornment: (
              <InputAdornment position="start">
                <Avatar
                  src={avatarexample}
                  sx={{ width: 38, height: 38, color: "white" }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Characters textLength={textLength} />
              </InputAdornment>
            ),
          }}
          {...register("text", { required: true })}
        />
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function ScrollTopButton() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        color="primary"
        size="small"
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: 80,
          right: 30,
          backgroundColor: "#223C43",
          "&:hover": {
            backgroundColor: "#223C43",
          },
        }}
      >
        <ArrowUpwardIcon />
      </Fab>
    </Zoom>
  );
}

export default function Home() {
  const { posts, isLoading: postsLoading } = usePosts();

  return (
    <Box maxWidth="600px" mx="auto">
      <NewPost />
      <Typography variant="h4" component="h4" fontWeight="bold">
        Últimos Posts
      </Typography>
      <PostsLists posts={posts} isLoading={postsLoading} />
      <ScrollTopButton />
    </Box>
  );
}
