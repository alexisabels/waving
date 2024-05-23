import { ArrowBack } from "@mui/icons-material";
import { Box, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Terms_ES from "./Terms_ES";
import Terms_EN from "./Terms_EN";

export default function TerminosYCondiciones() {
  const [language, setLanguage] = useState("es");
  const goBackLabel = language === "es" ? "VOLVER ATRÁS" : "GO BACK";

  const handleLanguageChange = (event, newLanguage) => {
    if (newLanguage !== null) {
      setLanguage(newLanguage);
    }
  };

  return (
    <Box sx={{ mt: 4, mx: 3 }}>
      <Button
        sx={{
          mr: 2,
          bgcolor: "#223C43",
          "&:hover": {
            bgcolor: "#40646e",
          },
          minWidth: "152px",
        }}
        component={NavLink}
        to={`/auth`}
        variant="contained"
        startIcon={<ArrowBack />}
      >
        {goBackLabel}
      </Button>
      <ToggleButtonGroup
        value={language}
        size="small"
        exclusive
        onChange={handleLanguageChange}
        aria-label="language"
        sx={{ mb: 2 }}
      >
        <ToggleButton value="es" aria-label="spanish">
          Español
        </ToggleButton>
        <ToggleButton value="en" aria-label="english">
          English
        </ToggleButton>
      </ToggleButtonGroup>

      {language === "es" ? <Terms_ES /> : <Terms_EN />}
      <Button
        sx={{
          mb: 2,
          bgcolor: "#223C43",
          "&:hover": {
            bgcolor: "#40646e",
          },
          minWidth: "152px",
        }}
        component={NavLink}
        to={`/auth`}
        variant="contained"
        startIcon={<ArrowBack />}
      >
        {goBackLabel}
      </Button>
    </Box>
  );
}
