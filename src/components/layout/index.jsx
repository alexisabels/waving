import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AUTH } from "../../lib/routes";
import { useAuth } from "../../hooks/auth";
import Navbar from "../navbar";

export default function Layout() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const {user, isLoading} = useAuth();

    useEffect(() => {
      if (!isLoading && pathname.startsWith("/protected") && !user) {
        navigate(AUTH);
      }
    }, [pathname, user, isLoading, navigate]);

    if (isLoading) return "Loading...";

  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}
