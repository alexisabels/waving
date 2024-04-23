import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./lib/routes";
import "./globals.css";

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Roboto"',
      '"Oxygen"',
      '"Ubuntu"',
      '"Cantarell"',
      '"Fira Sans"',
      '"Droid Sans"',
      '"Helvetica Neue"',
      "sans-serif",
    ].join(","),
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
