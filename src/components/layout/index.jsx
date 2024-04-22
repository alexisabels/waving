import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AUTH } from "../../lib/routes";
import { useAuth } from "../../hooks/auth";
import Navbar from "../navbar";
import { Box } from "@mui/material";
import LoadingPage from "../../utils/LoadingPage";
import texture from '../../assets/img/texture.png'


export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && pathname.startsWith("/protected") && !user) {
      navigate(AUTH);
    }
  }, [pathname, user, isLoading, navigate]);

  if (isLoading) return <LoadingPage />;

  return (
    <Box sx={{
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${texture})`,


    }}>
      <Navbar />
      <Box sx={{
      maxWidth: 'lg', 
      mx: 'auto', 
      p: 2, 

    }}>
      <Outlet />
      </Box>
    </Box>
  );
}
