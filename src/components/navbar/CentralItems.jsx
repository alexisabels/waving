/* eslint-disable react/prop-types */
import { Box, Stack } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function CentralItems({ icon, text, showText, linkTo }) {
  const currentPage = useLocation();
  let backgroundColor = "#40646e";
  if (currentPage.pathname === linkTo) {
    backgroundColor = "#517c8a";
  }
  return (
    <Box
      component={Link}
      to={linkTo}
      sx={{
        borderRadius: "16px",
        width: showText ? "120px" : "50px",
        height: "40px",
        borderColor: "transparent",
        color: "white",
        backgroundColor: backgroundColor,
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "bold",
        textTransform: "uppercase",
        transition: "width 0.3s ease, opacity 0.3s ease",
        overflow: "hidden",
        textDecoration: "none",
        "&:hover": { backgroundColor: "#517c8a" },
      }}
    >
      <Stack alignItems="center" direction="row" gap={1}>
        {icon}
        {showText && (
          <span
            style={{
              opacity: showText ? 1 : 0,
              transition: "opacity 0.3s ease 0.1s",
              whiteSpace: "nowrap",
            }}
          >
            {text}
          </span>
        )}
      </Stack>
    </Box>
  );
}

export default CentralItems;
