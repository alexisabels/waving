import React from 'react';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import { useLogin } from '../../hooks/auth';
import { useForm } from "react-hook-form";
import { emailValidate, passwordValidate } from '../../utils/form-validate';
import { HOME } from '../../lib/routes';

const Login = ({ onToggleForm }) => {
  const { login, isLoading, openSnackbar, setOpenSnackbar, snackbarMessage, snackbarSeverity } = useLogin();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
console.log(errors)
async function handleLogin(data) {
  const succeeded = await login({
    email: data.email,
    password: data.password,
    redirectTo: HOME,
  })
  if (succeeded) reset();
}

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto" }}>
      <Typography variant="h4"  component="h2" mb={2}>
        Iniciar Sesión
      </Typography>
      <form onSubmit={handleSubmit(handleLogin)}>
        <TextField
          fullWidth
          type="email"
          label="Email"
          margin="normal"
          {...register("email", emailValidate)}
          helperText={errors.email && errors.email.message}
          FormHelperTextProps={{
            style: {
              backgroundColor: 'transparent', // Establecer el fondo transparente
              color: 'red' // Establecer el color del texto a rojo
            }
          }}
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
          }}        />
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          margin="normal"
          {...register("password", passwordValidate)}
          helperText={errors.password && errors.password.message}
          FormHelperTextProps={{
            style: {
              backgroundColor: 'transparent', // Establecer el fondo transparente
              color: 'red' // Establecer el color del texto a rojo
            }
          }}
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
          }}        />
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
          Login
        </Button>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}
   anchorOrigin={{
      vertical: "bottom",
      horizontal: "right"
   }}>
        <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Typography textAlign="center">
        ¿No tienes una cuenta?
        <Button onClick={onToggleForm} sx={{ mt: 0, mb: 0, color: "#023b44" }}>
          Regístrate
        </Button>
      </Typography>
    </Box>
  );
};

export default Login;
