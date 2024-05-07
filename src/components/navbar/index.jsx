import {
  Box,
  Link,
  Stack,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import { PROTECTED } from "../../lib/routes";
import WaveLogo from "../../../public/assets/img/WaveLogo";

export default function Navbar() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.up("md"));
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
          width: trigger && isMobile ? "50%" : "97%",
          borderColor: "#223C43",
          height: 64,

          justifyContent: "space-around",
          alignItems: "center",
          display: "flex",
          backgroundColor: "#223C43",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          transition: "width 0.3s ease",
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
        <AccountMenu />
      </Box>
    </Box>
  );
}
