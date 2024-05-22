import { Tooltip, Typography } from "@mui/material";
import "./Waving.css";

function Waving() {
  return (
    <Tooltip title="Ir a la pantalla principal">
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
    </Tooltip>
  );
}

export default Waving;
