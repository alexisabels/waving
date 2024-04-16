/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  TextField,
  Button,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Grid,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Snackbar, Alert } from "@mui/material";
import { useRegister } from "../../hooks/auth";
import { useForm } from "react-hook-form";
import {
  emailValidate,
  passwordValidate,
  usernameValidate,
} from "../../utils/form-validate";
import { HOME } from "../../lib/routes";
import { AlternateEmail, Key, MailOutline } from "@mui/icons-material";
const Register = ({ onToggleForm }) => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [termsError, setTermsError] = useState(""); // State to handle terms acceptance error
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    register: signup,
    isLoading,
    openSnackbar,
    setOpenSnackbar,
    snackbarMessage,
    snackbarSeverity,
  } = useRegister();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  console.log(errors);
  async function handleRegister(data) {
    if (!acceptTerms) {
      setTermsError(
        "Debes aceptar los términos y condiciones para registrarte."
      );
      setOpenSnackbar(true); // Show the snackbar
      return;
    }
    const result = await signup({
      username: data.username,
      email: data.email,
      password: data.password,
      redirectTo: HOME,
    });
    if (result) {
      reset();
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ mt: 1, maxWidth: 400, mx: "auto" }}>
      <Typography variant="h4" component="h2" mb={2}>
        Registro
      </Typography>
      <form onSubmit={handleSubmit(handleRegister)}>
        <TextField
          variant="outlined"
          margin="normal"
          {...register("username", usernameValidate)}
          helperText={errors.username && errors.username.message}
          FormHelperTextProps={{ style: { color: "red" } }}
          style={{ background: "transparent" }}
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmail fontSize="medium" />
              </InputAdornment>
            ),
          }}
          label="Nombre de usuario"
          name="username"
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
          variant="outlined"
          margin="normal"
          {...register("email", emailValidate)}
          helperText={errors.email && errors.email.message}
          FormHelperTextProps={{ style: { color: "red" } }}
          style={{ background: "transparent" }}
          required
          fullWidth
          label="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutline fontSize="medium" />
              </InputAdornment>
            ),
          }}
          name="email"
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
          variant="outlined"
          margin="normal"
          required
          {...register("password", passwordValidate)}
          helperText={errors.password && errors.password.message}
          FormHelperTextProps={{ style: { color: "red" } }}
          style={{ background: "transparent" }}
          fullWidth
          name="password"
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
          label="Contraseña"
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
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              name="acceptTerms"
              sx={{ color: "#303030", fill: "#303030" }}
              style={{
                color: "#303030",
              }}
            />
          }
          label={
            <span>
              Acepto los{" "}
              <Link
                to="/terminosycondiciones"
                style={{ textDecoration: "underline", color: "#000000" }}
              >
                términos y condiciones
              </Link>
            </span>
          }
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{
            mt: 3,
            mb: 2,
            borderRadius: "20px",
            backgroundColor: "#303030",
            "&:hover": { backgroundColor: "#303030" },
            textTransform: "none",
            fontWeight: "regular",
          }}
        >
          Registrarse
        </Button>
      </form>
      <Grid container alignItems="center" justifyContent="center" spacing={1}>
        <Grid item>
          <Typography>¿Ya tienes una cuenta?</Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={onToggleForm}
            sx={{
              color: "#303030",
              fontWeight: "medium",
            }}
          >
            Iniciar sesión
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
          severity={termsError ? "error" : snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {termsError || snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
