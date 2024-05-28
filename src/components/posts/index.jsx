/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  CircularProgress,
  Paper,
  Stack,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/user";
import { PROTECTED } from "../../lib/routes";
import PostMenu from "./PostMenu";
import InteractionBar from "./InteractionBar";
import moment from "moment";
import "moment/dist/locale/es";
import FollowBtn from "../../utils/FollowBtn";
import { Link as MuiLink } from "@mui/material";

export default function Post({ post, currentUser, showSnackbar }) {
  const { text, uid } = post;
  const { user, loading } = useUser(uid);

  const username = loading ? (
    <CircularProgress size="1rem" color="inherit" />
  ) : user ? (
    user.username
  ) : (
    "Usuario desconocido"
  );
  moment.locale("es");
  const today = moment().startOf("day");
  const postDate = moment(post.date);

  const isToday = postDate.isSame(today, "day");

  let timestamp;
  if (isToday) {
    timestamp = postDate.fromNow();
  } else {
    timestamp = postDate.calendar(null, {
      sameDay: "[hoy a las] LT",
      nextDay: "[mañana a las] LT",
      nextWeek: "dddd [a las] LT",
      lastDay: "[ayer a las] LT",
      lastWeek: "[el] dddd [pasado a las] LT",
      sameElse: "D [de] MMMM [de] YYYY [·] LT",
    });
  }

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
            <Tooltip
              title={`Ver el perfil de ${username}`}
              TransitionComponent={Zoom}
            >
              <Avatar
                src={user?.avatar}
                sx={{ width: 38, height: 38, color: "white" }}
                component={Link}
                to={`${PROTECTED}/profile/${username}`}
              />
            </Tooltip>
            <Box sx={{ ml: 2 }}>
              <div>
                <Tooltip
                  title={`Ver el perfil de ${username}`}
                  TransitionComponent={Zoom}
                >
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
                </Tooltip>
                <FollowBtn currentUserId={currentUser?.id} targetUserId={uid} />
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
          pb: 1,
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
          const urlRegex =
            /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
          if (urlRegex.test(part)) {
            return (
              <MuiLink
                key={index}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
              >
                {part}
              </MuiLink>
            );
          }
          return <React.Fragment key={index}>{part}</React.Fragment>;
        })}
      </Typography>
      <InteractionBar postId={post.id} />
    </Paper>
  );
}
