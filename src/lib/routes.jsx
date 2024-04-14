import { createBrowserRouter } from "react-router-dom"
import AuthPage from "../components/auth/AuthPage";
import Layout from "../components/layout"
import Home from "../components/home";
export const ROOT ="/";
export const AUTH = "/auth";
export const PROFILE ="/protected/profile/:id"
export const PROTECTED ="/protected"
export const HOME = "/protected/home"

export const router = createBrowserRouter([
    {path: ROOT, element: "Public Root"},
    {path: AUTH, element: <AuthPage />},
    {path: PROTECTED, element: <Layout />, children: [
        {
            path: HOME,
            element: <Home />
        },
        {
            path: PROFILE,
            element: "User profile for a specific id"
        },
    ]}
]);

