import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import { router } from "./lib/routes";
import './globals.css'

export default function App() {
  //rutas
  return (<>
  <RouterProvider router={router} />
  </>);
}
