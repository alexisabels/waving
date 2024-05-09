/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Link,
  Stack,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import WaveLogo from "../../../public/assets/img/WaveLogo";
import { PROTECTED } from "../../lib/routes";
import AccountMenu from "./AccountMenu";
import { PeopleRounded, Settings } from "@mui/icons-material";
import avatarexample from "./../../../public/assets/img/avatarexample.png";

export default function Navbar() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const mediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  const location = useLocation();

  const handleScrollToTop = () => {
    if (location.pathname === `${PROTECTED}/home`) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EBE3DD",
        position: "sticky",
        top: 0,
        zIndex: 3,
        pt: 1,
        display: "flex",
        transition: "all 0.3s ease",
      }}
    >
      <Box
        sx={{
          borderRadius: 5,
          width: trigger && isMobile && mediumScreen ? "50%" : "86%",
          borderColor: "#223C43",
          height: 64,
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
          backgroundColor: "#223C43",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          transition: "width 0.3s ease",
          px: 2,
        }}
      >
        <Link
          component={NavLink}
          to={`${PROTECTED}/home`}
          onClick={handleScrollToTop}
          sx={{
            color: "#FFFF",
            fontWeight: "bold",
            textDecoration: "none",
            fontSize: "1.3rem",
          }}
        >
          <Stack alignItems="center" direction="row" gap={1}>
            <WaveLogo />
            Waving
          </Stack>
        </Link>

        {isMobile && (
          <Stack direction="row" gap={2} sx={{ alignItems: "center", mx: 2 }}>
            <CentralBox
              icon={<PeopleRounded />}
              text="Social"
              showText={!trigger && mediumScreen}
            />

            <CentralBox
              icon={
                <Avatar
                  sx={{ width: 25, height: 25, color: "black" }}
                  src={avatarexample}
                />
              }
              text="Mi perfil"
              showText={!trigger && mediumScreen}
            />
            <CentralBox
              icon={<Settings />}
              text="Ajustes"
              showText={!trigger && mediumScreen}
            />
          </Stack>
        )}

        <AccountMenu />
      </Box>
    </Box>
  );
}

function CentralBox({ icon, text, showText }) {
  return (
    <Box
      sx={{
        borderRadius: "16px",
        width: showText ? "120px" : "50px", // Reduce el ancho si no se muestra el texto
        height: "40px",
        borderColor: "transparent",
        color: "white",
        backgroundColor: "#40646e",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "bold",
        textTransform: "uppercase",
        transition: "width 0.3s ease",
      }}
    >
      <Stack alignItems="center" direction="row" gap={1}>
        {icon}
        {showText && text}
      </Stack>
    </Box>
  );
}
