import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import { useRegister } from "../../hooks/auth";
import { useForm } from "react-hook-form";
import { emailValidate, passwordValidate, usernameValidate } from "../../utils/form-validate";
import { HOME } from "../../lib/routes";

const Register = ({ onToggleForm }) => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [termsError, setTermsError] = useState(''); // State to handle terms acceptance error

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
      setTermsError("Debes aceptar los términos y condiciones para registrarte.");
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
          FormHelperTextProps={{
            style: {
              backgroundColor: 'transparent', // Establecer el fondo transparente
              color: 'red' // Establecer el color del texto a rojo
            }
          }}
          required
          fullWidth
          label="Nombre de usuario"
          name="username"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#023b44",
              },
            },
            "& .MuiInputLabel-outlined.Mui-focused": {
              color: "#023b44",
            },
            bgcolor: "white",
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          {...register("email", emailValidate)}
          helperText={errors.email && errors.email.message}
          FormHelperTextProps={{
            style: {
              backgroundColor: 'transparent', 
              color: 'red' 
            }
          }}
          required
          fullWidth
          label="Email"
          name="email"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#023b44",
              },
            },
            "& .MuiInputLabel-outlined.Mui-focused": {
              color: "#023b44",
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
          FormHelperTextProps={{
            style: {
              backgroundColor: 'transparent', // Establecer el fondo transparente
              color: 'red' // Establecer el color del texto a rojo
            }
          }}
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#023b44",
              },
            },
            "& .MuiInputLabel-outlined.Mui-focused": {
              color: "#023b44",
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
              sx={{ color: "#023b44" }}
            />
          }
          label="Acepto los términos y condiciones"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "#023b44",
            "&:hover": { backgroundColor: "#022b34" },
          }}
        >
          Registrarse
        </Button>
      </form>
      <Typography textAlign="center">
        ¿Ya tienes una cuenta?{" "}
        <Button onClick={onToggleForm} sx={{ mt: 0, mb: 0, color: "#023b44" }}>
          Inicia sesión
        </Button>
      </Typography>
 

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}
   anchorOrigin={{
      vertical: "bottom",
      horizontal: "right"
   }}>
        <Alert onClose={handleClose} severity={termsError ? "error" : snackbarSeverity} sx={{ width: '100%' }}>
          {termsError || snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
