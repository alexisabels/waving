import { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
  useMediaQuery,
  Avatar,
  Box,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { NavLink } from "react-router-dom";
import { PROTECTED } from "../../lib/routes";
import { useAuth, useLogout } from "../../hooks/auth";
import avatarexample from "./../../assets/img/avatarexample.png";

export default function AppMobileBar() {
  const [value, setValue] = useState("recents");
  const theme = useTheme();
  // eslint-disable-next-line no-unused-vars
  const { logout, isLoading } = useLogout();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
              "& .MuiBottomNavigationAction-label": {
                color: "white",
              },
            }}
          >
            <BottomNavigationAction
              label="Home"
              icon={<HomeRoundedIcon sx={{ color: "white" }} />}
              component={NavLink}
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
              label="Users"
              icon={<GroupRoundedIcon sx={{ color: "white" }} />}
              component={NavLink}
              to={`${PROTECTED}/users`}
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
