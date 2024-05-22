/* eslint-disable react/prop-types */
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/auth";
import { useAddPost } from "../../hooks/post";
import avatarexample from "./../../../public/assets/img/avatarexample.png";
import InputLength from "./InputLength";

export default function NewPost() {
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
                <InputLength textLength={textLength} />
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
