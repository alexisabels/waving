import { createBrowserRouter } from "react-router-dom"
import AuthPage from "../components/auth/AuthPage";
import Layout from "../components/layout"
export const ROOT ="/";
export const AUTH = "/auth";

export const PROTECTED ="/protected"
export const HOME = "/protected/home"

export const router = createBrowserRouter([
    {path: ROOT, element: "Public Root"},
    {path: AUTH, element: <AuthPage />},
    {path: PROTECTED, element: <Layout />, children: [
        {
            path: HOME,
            element: "Home"
        },
    ]}
]);

