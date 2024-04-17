import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthPage from "../components/auth/AuthPage";
import Layout from "../components/layout";
import Home from "../components/home";
import TerminosYCondiciones from "../components/terms/TerminosYCondiciones";
export const ROOT = "/";
export const AUTH = "/auth";
export const PROFILE = "/protected/profile/:id";
export const PROTECTED = "/protected";
export const HOME = "/protected/home";
export const TERMSANDCONDITONS = "/terminosycondiciones";
export const router = createBrowserRouter([
  {
    path: ROOT,
    element: <Navigate to={HOME} replace />,
  },
  { path: AUTH, element: <AuthPage /> },
  { path: TERMSANDCONDITONS, element: <TerminosYCondiciones /> },
  {
    path: PROTECTED,
    element: <Layout />,
    children: [
      {
        path: HOME,
        element: <Home />,
      },
      {
        path: PROFILE,
        element: "User profile for a specific id",
      },
    ],
  },
]);
