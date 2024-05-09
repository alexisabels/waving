/* eslint-disable react/prop-types */
import { Box, Stack } from "@mui/material";

function CentralItems({ icon, text, showText }) {
  return (
    <Box
      sx={{
        borderRadius: "16px",
        width: showText ? "120px" : "50px",
        height: "40px",
        borderColor: "transparent",
        color: "white",
        backgroundColor: "#40646e",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "bold",
        textTransform: "uppercase",
        transition: "width 0.3s ease",
      }}
    >
      <Stack alignItems="center" direction="row" gap={1}>
        {icon}
        {showText && text}
      </Stack>
    </Box>
  );
}

export default CentralItems;
