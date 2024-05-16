import { Typography } from "@mui/material";
import "./Waving.css";

function Waving() {
  return (
    <div className="wave">
      <Typography
        variant="p"
        className="wave-text"
        sx={{
          color: "white",
          userSelect: "none",
          WebkitUserSelect: "none",
          msUserSelect: "none",
          MozUserSelect: "none",
          display: "inline-block",
        }}
      >
        {"Waving".split("").map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </Typography>
    </div>
  );
}

export default Waving;
