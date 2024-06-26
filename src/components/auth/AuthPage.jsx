import { useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";

import Register from "./Register";
import Login from "./Login";
import ocean from "../../../public/assets/img/ocean.jpg";
import texture from "../../../public/assets/img/texture.png";
import "./AuthPage.css";
import WelcomeMsg from "./WelcomeMsg";
const AuthPage = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: "primary.white",
      }}
    >
      {!isMobile && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${ocean})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <WelcomeMsg />
        </Box>
      )}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${texture})`,
        }}
      >
        <Box sx={{ width: { xs: "80%", md: "400px" } }}>
          {isRegistered ? (
            <Login onToggleForm={() => setIsRegistered(false)} />
          ) : (
            <Register onToggleForm={() => setIsRegistered(true)} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPage;
