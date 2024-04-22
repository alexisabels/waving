import { Paper, Typography, Box, Avatar, Stack } from "@mui/material";

export default function Post({ post }) {
  const { text } = post;
  const username = "alex123";
  const timestamp = "hace 1 minuto";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        my: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        border: 1,
        borderColor: "grey.300",
        borderRadius: 5,
        overflow: "hidden",
        bgcolor: "grey.100",
      }}
    >
      <Box
        sx={{
          bgcolor: "rgb(230, 230, 230)",

          px: 2,
          py: 1,
          display: "flex",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ width: 38, height: 38, color: "black" }}></Avatar>{" "}
        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle2" component="div" noWrap>
            {username}
          </Typography>
          <Typography
      variant="caption"
      sx={{
        color: 'rgba(0, 0, 0, 0.38)', 
        noWrap: true
      }}
    >            {timestamp}
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="body1"
        sx={{
          wordBreak: "break-word",
          whiteSpace: "pre-line",
          p: 2,
        }}
      >
        {text}
      </Typography>
    </Paper>
  );
}
