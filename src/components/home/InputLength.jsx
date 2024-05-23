/* eslint-disable react/prop-types */
import { Tooltip, Typography, Zoom } from "@mui/material";

function InputLength({ textLength }) {
  const color = textLength > 240 ? "red" : "lightgray";
  const tooltipTitle =
    textLength > 240
      ? "Has superado el límite de caracteres permitido"
      : "Límite de caracteres";
  return (
    <Tooltip title={tooltipTitle} TransitionComponent={Zoom}>
      <Typography
        variant="body2"
        style={{ color: color }}
        sx={{
          color: "white",
          userSelect: "none",
          WebkitUserSelect: "none",
          msUserSelect: "none",
          MozUserSelect: "none",
        }}
      >
        {textLength}/240
      </Typography>
    </Tooltip>
  );
}
export default InputLength;
