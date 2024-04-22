/* eslint-disable react/prop-types */
import { useState } from "react";

import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";

import { useLogin } from "../../hooks/auth";
import { useForm } from "react-hook-form";
import { emailValidate, passwordValidate } from "../../utils/form-validate";
import { HOME } from "../../lib/routes";
import {
  AlternateEmail,
  Key,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
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
                borderColor: "#303030",
              },
            },
            "& .MuiInputLabel-outlined.Mui-focused": {
              color: "#303030",
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
                borderColor: "#303030",
              },
            },
            "& .MuiInputLabel-outlined.Mui-focused": {
              color: "#303030",
            },
            bgcolor: "white",
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "#303030",
            borderRadius: "20px",

            "&:hover": { backgroundColor: "#303030" },
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
          //BOTÓN DE REGISTROS DESHABILITADO
          disabled
          // CAMBIAR CONFIG. FIREBASE TAMBIÉN
          variant="contained"
            onClick={onToggleForm}
            sx={{
              color: "#303030",
              fontWeight: "medium",
            }}
          >
            REGISTRO DESHABILITADO TEMPORALMENTE
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

export default Login;
