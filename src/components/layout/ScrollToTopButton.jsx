import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Fab, Zoom, useScrollTrigger } from "@mui/material";

export default function ScrollToTopButton() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        color="primary"
        size="small"
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: 80,
          right: 30,
          backgroundColor: "#223C43",
          "&:hover": {
            backgroundColor: "#223C43",
          },
        }}
      >
        <ArrowUpwardIcon />
      </Fab>
    </Zoom>
  );
}
