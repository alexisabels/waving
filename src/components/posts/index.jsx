/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/user";
import { PROTECTED } from "../../lib/routes";
import avatarexample from "./../../../public/assets/img/avatarexample.png";
import PostMenu from "./PostMenu";
import InteractionBar from "./InteractionBar";

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
          bgcolor: "#34535c",
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
          {currentUser?.id === uid && (
            <PostMenu postId={post.id} showSnackbar={showSnackbar} />
          )}
        </Stack>
      </Box>
      <Typography
        variant="body1"
        sx={{
          wordBreak: "break-word",
          whiteSpace: "pre-line",
          p: 2,
          "& a": {
            color: "#007bff",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
              color: "#007bff",
            },
            "&:visited": {
              color: "#007bff",
            },
          },
        }}
      >
        {text.split(/(\s+)/).map((part, index) => {
          // Regex que identifica URLs
          const urlRegex =
            /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
          if (urlRegex.test(part)) {
            return (
              <Link key={index} href={part} rel="noopener">
                {part}
              </Link>
            );
          }
          return <React.Fragment key={index}>{part}</React.Fragment>;
        })}
      </Typography>
      {/* BARRA DE INTERACCIÓN */}
      <InteractionBar />
    </Paper>
  );
}
