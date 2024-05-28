import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthPage from "../components/auth/AuthPage";
import Home from "../components/home";
import Layout from "../components/layout";
import Profile from "../components/profile/Profile";
import TerminosYCondiciones from "../components/terms/TerminosYCondiciones";
import SocialPage from "../components/social/SocialPage";
import SettingsPage from "../components/settings/SettingsPage";
import PostPage from "../components/postPage/PostPage";
export const ROOT = "/";
export const AUTH = "/auth";
export const PROFILE = "/protected/profile/:username";
export const PROTECTED = "/protected";
export const HOME = "/protected/home";
export const SOCIAL = "/protected/social";
export const AJUSTES = "/protected/ajustes";
export const POST = "/protected/post/:postId";
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
        element: <Profile />,
      },
      {
        path: SOCIAL,
        element: <SocialPage />,
      },
      {
        path: AJUSTES,
        element: <SettingsPage />,
      },
      {
        path: POST,
        element: <PostPage />,
      },
    ],
  },
]);
