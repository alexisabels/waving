import {
  Alert,
  Avatar,
  Box,
  Button,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useAddPost, usePosts } from "../../hooks/post";
import { useAuth } from "../../hooks/auth";
import PostsLists from "../posts/PostsLists";
import avatarexample from "./../../../public/assets/img/avatarexample.png";

function NewPost() {
  const { register, handleSubmit, reset } = useForm();
  const {
    addPost,
    // eslint-disable-next-line no-unused-vars
    isLoading,
    openSnackbar,
    setOpenSnackbar,
    snackbarMessage,
    snackbarSeverity,
  } = useAddPost();
  // eslint-disable-next-line no-unused-vars
  const { user, isLoading: authLoading } = useAuth();
  function handleAddPost(data) {
    addPost({
      uid: user.id,
      text: data.text,
    });
    console.log(data);
    reset();
    setOpenSnackbar(true);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  return (
    <Box
      paddingTop={6}
      paddingBottom={4}
      width="80%"
      sx={{ width: "85%", maxWidth: "600px", mx: "auto" }}
    >
      <form onSubmit={handleSubmit(handleAddPost)}>
        <Stack spacing={2} direction="row" justifyContent="space-between">
          <Typography variant="h5" component="h5" fontWeight="bold">
            Nuevo Post
          </Typography>
          <Button
            // cambiar a loadingbutton de mui
            variant="contained"
            size="medium"
            type="submit"
            style={{
              borderRadius: 20,
              textTransform: "none",
              backgroundColor: "#223C43",
              width: "100px",
            }}
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
              fontSize: "small",
              fontWeight: "small",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "black",
                border: "none",
                boxShadow: "0 0 0 5px rgba(34, 60, 67, 0.1)",
              },
            },
            startAdornment: (
              <InputAdornment position="start">
                <Avatar
                  src={avatarexample}
                  sx={{ width: 38, height: 38, color: "white" }}
                ></Avatar>
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
export default function Home() {
  const { posts, isLoading: postsLoading } = usePosts();

  return (
    <Box maxWidth="600px" mx="auto">
      <NewPost />

      <PostsLists posts={posts} isLoading={postsLoading} />
    </Box>
  );
}
