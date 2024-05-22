/* eslint-disable react/prop-types */
import { Avatar, Box, Button, Paper, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PROTECTED } from "../../../lib/routes";
import moment from "moment";

export default function FollowedUserCard({ user }) {
  moment.locale("es");
  const today = moment().startOf("day");
  const followedDate = moment(user.followedAt);

  // verifica si la fecha es de hoy
  const isToday = followedDate.isSame(today, "day");

  let date;
  if (isToday) {
    date = followedDate.fromNow();
  } else {
    date = followedDate.calendar(null, {
      sameDay: "[hoy]", // no se usa ya que 'isToday' arriba lo maneja
      lastDay: "[ayer]",
      lastWeek: "[el] dddd",
      sameElse: "[el] D [de] MMMM [de] YYYY",
    });
  }

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
        <Avatar src={user.avatar} sx={{ width: 56, height: 56 }} />
        <Typography variant="h6" sx={{ textAlign: "center", minHeight: 40 }}>
          {user.username}
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: "center" }}
          fontSize="12px"
        >
          siguiendo desde {date}
        </Typography>
        <Tooltip title={`Dejar de seguir a ${user.username}`}>
          <Button
            variant="contained"
            size="medium"
            sx={{
              borderRadius: 20,
              textTransform: "none",
              backgroundColor: "#223C43",
              "&:hover": { backgroundColor: "#3a6b78" },
              width: "100px",
              marginTop: "auto",
            }}
          >
            Unfollow
          </Button>
        </Tooltip>
      </Paper>
    </Box>
  );
}
