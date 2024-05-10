import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth, useLogout } from "../../hooks/auth";
import { PROTECTED } from "../../lib/routes";
import avatarexample from "./../../../public/assets/img/avatarexample.png";
import { Settings } from "@mui/icons-material";

export default function AppMobileBar() {
  const [value, setValue] = useState("recents");
  const theme = useTheme();
  // eslint-disable-next-line no-unused-vars
  const { logout, isLoading } = useLogout();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  const handleScrollToTop = () => {
    if (location.pathname === `${PROTECTED}/home`) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {isMobile && (
        <Box
          sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(235, 227, 221, 0.8)",

            position: "fixed",
            bottom: 0,
            zIndex: 3,
            // pt: 1,
            pb: 1,
            display: "flex",
          }}
        >
          <BottomNavigation
            value={value}
            onChange={handleChange}
            sx={{
              borderRadius: 5,
              width: "97%",
              borderColor: "#223C43",
              height: 64,
              justifyContent: "space-around",
              alignItems: "center",
              display: "flex",
              backgroundColor: "rgba(34, 60, 67, 1.98)",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              "& .MuiBottomNavigationAction-root": {
                minWidth: 0,
                padding: "6px 6px",
                "& .MuiBottomNavigationAction-label": {
                  color: "white",
                  fontSize: "0.75rem",
                },
                "& .MuiSvgIcon-root": {
                  fontSize: "1.5rem",
                },
              },
            }}
          >
            <BottomNavigationAction
              label="Home"
              icon={<HomeRoundedIcon sx={{ color: "white" }} />}
              component={NavLink}
              onClick={handleScrollToTop}
              to={`${PROTECTED}/home`}
              showLabel={true}
            />
            <BottomNavigationAction
              label="Profile"
              icon={
                <Avatar
                  src={avatarexample}
                  sx={{ width: 24, height: 24, color: "black" }}
                />
              }
              component={NavLink}
              to={`${PROTECTED}/profile/${user?.username}`}
              showLabel={true}
            />
            <BottomNavigationAction
              label="Social"
              icon={<GroupRoundedIcon sx={{ color: "white" }} />}
              component={NavLink}
              to={`${PROTECTED}/social`}
              showLabel={true}
            />
            <BottomNavigationAction
              label="Ajustes"
              icon={<Settings sx={{ color: "white" }} />}
              component={NavLink}
              to={`${PROTECTED}/ajustes/`}
              showLabel={true}
            />
            <BottomNavigationAction
              label="Logout"
              icon={<LogoutRoundedIcon sx={{ color: "white" }} />}
              onClick={logout}
              showLabel={true}
            />
          </BottomNavigation>
        </Box>
      )}
    </>
  );
}
