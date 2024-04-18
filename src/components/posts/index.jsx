/* eslint-disable react/prop-types */
import { Paper, Typography } from "@mui/material";

export default function Post({ post }) {
  const {text} = post;
  return (
    <Paper

      elevation={1}
      sx={{
        
        maxWidth: "500px",
        width: '90%',
        mb: 2,
        p: 2,
        border: 1,
        borderColor: "grey.300",
        borderRadius: 2,
        // No se necesita 'mx' si el Box padre ya centra sus elementos hijos
      }}
    >
      <Typography
        variant="body1"
        sx={{ wordBreak: "break-word" }}
        component="pre"
      >
        {text}
      </Typography>
    </Paper>
  );
}