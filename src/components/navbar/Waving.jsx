import { Typography } from "@mui/material";
import "./Waving.css";

function Waving() {
  return (
    <div className="wave">
      <Typography
        variant="p"
        sx={{
          color: "white",
          userSelect: "none",
          WebkitUserSelect: "none",
          msUserSelect: "none",
          MozUserSelect: "none",
        }}
      >
        Waving
      </Typography>
    </div>
  );
}

export default Waving;
