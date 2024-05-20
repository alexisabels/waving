import { Typography } from "@mui/material";
import "./WelcomeMsg.css"; // Asegúrate de importar el archivo CSS

export default function WelcomeMsg() {
  return (
    <Typography
      variant="h2"
      component="div"
      className="fade-in"
      sx={{
        color: "white",
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none",
        MozUserSelect: "none",
      }}
    >
      Hola!
    </Typography>
  );
}
