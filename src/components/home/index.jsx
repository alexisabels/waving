import { Alert, Box, Button, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAddPost, usePosts } from "../../hooks/post";
import { useAuth } from "../../hooks/auth";
import PostsLists from "../posts/PostsLists";
function NewPost() {
  const { register, handleSubmit, reset } = useForm();
  const {
    addPost,
    isLoading,
    openSnackbar,
    setOpenSnackbar,
    snackbarMessage,
    snackbarSeverity,
  } = useAddPost();
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
    <>
        <Box maxWidth="600px" mx="auto" paddingTop={8} paddingBottom={4} >
        <form onSubmit={handleSubmit(handleAddPost)}>
          <Stack spacing={2} direction="row" justifyContent="space-between">
            <Typography variant="h5" component="h4" fontWeight="bold">
              {/* cambiar a loadingbutton de mui */}
              Nuevo Post
            </Typography>
            <Button
              variant="contained"
              size="medium"
              color="info"
              type="submit"
            >
              Post
            </Button>
          </Stack>
          <TextField
            minRows="3"
            id="outlined-textarea"
            placeholder="Escribe un nuevo post"
            multiline
            fullWidth
            margin="normal"
            {...register("text", { required: true })}
          />
        </form>
      </Box>
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
    </>
  )
}
export default function Home() {
  const { posts, isLoading: postsLoading } = usePosts();

  return (
    <>
  <NewPost />
  <PostsLists posts={posts} isLoading={postsLoading}/>
    </>
  );
}
