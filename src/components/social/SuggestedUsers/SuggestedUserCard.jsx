/* eslint-disable react/prop-types */
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PROTECTED } from "../../../lib/routes";

export default function SuggestedUserCard({ user }) {
  const date =
    user && user.date
      ? new Date(user.date).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
        })
      : "Fecha no disponible";
  return (
    <Box
      component={Link}
      to={`${PROTECTED}/profile/${user?.username}`}
      sx={{
        width: 160,

        textDecoration: "none",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          height: 180,
          justifyContent: "space-between",
          "&:hover": { boxShadow: "0 8px 16px rgba(0,0,0,0.3)" },
        }}
      >
        <Avatar sx={{ width: 56, height: 56 }} />
        <Typography variant="h6" sx={{ textAlign: "center", minHeight: 40 }}>
          {user.username}
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: "center" }}
          fontSize="12px"
        >
          {date}
        </Typography>
        <Button
          variant="contained"
          size="medium"
          disabled
          sx={{
            borderRadius: 20,
            textTransform: "none",
            backgroundColor: "#223C43",
            width: "100px",
            marginTop: "auto",
          }}
        >
          Seguir
        </Button>
      </Paper>
    </Box>
  );
}
