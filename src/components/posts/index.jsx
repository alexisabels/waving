/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Asegúrate de que la ruta de importación es correcta
import { Paper, Typography, Box, Avatar, Stack } from "@mui/material";
import avatarexample from "./../../../public/assets/img/avatarexample.png";
import React from "react";
import PostMenu from "./PostMenu"; // Verifica la ruta
import { useUser } from "../../hooks/user";
import { PROTECTED } from "../../lib/routes";
import { Link } from "react-router-dom";

export default function Post({ post, currentUser, showSnackbar }) {
  const { text, uid } = post;
  const { user, loading } = useUser(uid);

  const username = loading ? "" : user ? user.username : "Usuario desconocido";
  const timestamp = "hace 1 minuto";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "96%",
        my: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        border: 0,
        borderColor: "transparent",
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      }}
    >
      <Box
        sx={{
          bgcolor: "#223C43",
          color: "white",
          display: "flex",
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%", px: 2, py: 1 }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={avatarexample}
              sx={{ width: 38, height: 38, color: "white" }}
              component={Link}
              to={`${PROTECTED}/profile/${username}`}
            />
            <Box sx={{ ml: 2 }}>
              <div>
                <Typography
                  variant="subtitle2"
                  component={Link}
                  noWrap
                  to={`${PROTECTED}/profile/${username}`}
                  sx={{
                    textDecoration: "none",
                    color: "white",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {username}
                </Typography>
              </div>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                {timestamp}
              </Typography>
            </Box>
          </Box>
          {currentUser.id === uid && (
            <PostMenu postId={post.id} showSnackbar={showSnackbar} />
          )}
        </Stack>
      </Box>
      <Typography
        variant="body1"
        sx={{ wordBreak: "break-word", whiteSpace: "pre-line", p: 2 }}
      >
        {text}
      </Typography>
    </Paper>
  );
}
