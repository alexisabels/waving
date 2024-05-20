/* eslint-disable react/prop-types */

import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import FollowToggleButton from "../../posts/FollowBtn";

export default function ModalUserChip({ user }) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 1.5,
        borderColor: "#223C43",
        display: "flex",
        alignItems: "center",
        width: "90%",
        mb: 1,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Stack direction="row" alignItems="center">
          <Avatar sx={{ width: 40, height: 40, mr: 1.5 }} />
          <Box>
            <Typography variant="body1" noWrap>
              alesguga
            </Typography>
          </Box>
        </Stack>
        <FollowToggleButton />
      </Stack>
    </Box>
  );
}
