export const usernameValidate = {
  required: {
    value: true,
    message: "Por favor, introduce un nombre de usuario",
  },
  minLength: {
    value: 4,
    message: "El nombre de usuario no puede tener menos de 4 caracteres",
  },
  pattern: {
    //regex para validar user (letras y numeros)
    value: /^[a-zA-Z0-9]+$/,
    message:
      "El nombre de usuario solo puede contener letras y números, ni espacios ni símbolos",
  },
};

export const emailValidate = {
  required: {
    value: true,
    message: "Por favor, introduce un email válido",
  },
  pattern: {
    //regex para validar mail
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "El email no es válido",
  },
};

export const passwordValidate = {
  required: {
    value: true,
    message: "Por favor, introduce una contraseña",
  },
  minLength: {
    value: 6,
    message: "La contraseña no puede tener menos de 6 caracteres",
  },
};
