/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useState } from "react";

import {
  AlternateEmail,
  Key,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/auth";
import { HOME } from "../../lib/routes";
import { emailValidate, passwordValidate } from "../../utils/form-validate";
import PasswordResetModal from "./PasswordResetModal";

const Login = ({ onToggleForm }) => {
  const {
    login,
    isLoading,
    openSnackbar,
    setOpenSnackbar,
    snackbarMessage,
    snackbarSeverity,
  } = useLogin();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  console.log(errors);
  async function handleLogin(data) {
    const succeeded = await login({
      email: data.email,
      password: data.password,
      redirectTo: HOME,
    });
    if (succeeded) reset();
  }
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box sx={{ maxWidth: 400, mx: "auto" }}>
      <Typography variant="h4" component="h2" mb={2}>
        Iniciar Sesión
      </Typography>
      <form onSubmit={handleSubmit(handleLogin)}>
        <TextField
          fullWidth
          type="email"
          label="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmail fontSize="medium" />
              </InputAdornment>
            ),
          }}
          margin="normal"
          {...register("email", emailValidate)}
          helperText={errors.email && errors.email.message}
          FormHelperTextProps={{ style: { color: "red" } }}
          style={{ background: "transparent" }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#223C43",
              },
            },
            "& .MuiInputLabel-outlined.Mui-focused": {
              color: "#223C43",
            },
            bgcolor: "white",
          }}
        />
        <TextField
          fullWidth
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Key fontSize="medium" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          margin="normal"
          {...register("password", passwordValidate)}
          helperText={errors.password && errors.password.message}
          FormHelperTextProps={{ style: { color: "red" } }}
          style={{ background: "transparent" }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#223C43",
              },
            },
            "& .MuiInputLabel-outlined.Mui-focused": {
              color: "#223C43",
            },
            bgcolor: "white",
          }}
        />
        <Typography
          fontWeight="light"
          fontSize="smaller"
          sx={{
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          onClick={handleOpenModal}
        >
          He olvidado mi contraseña
        </Typography>
        <PasswordResetModal open={modalOpen} onClose={handleCloseModal} />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "#223C43",
            borderRadius: "20px",

            "&:hover": { backgroundColor: "#223C43" },
            textTransform: "none",
            fontWeight: "regular",
          }}
        >
          Iniciar sesión
        </Button>
      </form>
      <Grid container alignItems="center" justifyContent="center" spacing={1}>
        <Grid item>
          <Typography>¿Aún no tienes cuenta?</Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={onToggleForm}
            sx={{
              color: "#223C43",
              fontWeight: "medium",
              "&:hover": {
                color: "#223C43",
              },
            }}
          >
            REGISTRARME
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
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
};

Login.propTypes = {
  onToggleForm: PropTypes.func.isRequired,
};

export default Login;
