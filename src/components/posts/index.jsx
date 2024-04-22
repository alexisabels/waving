/* eslint-disable react/prop-types */
import { Paper, Typography } from "@mui/material";

export default function Post({ post }) {
  const {text} = post;
  return (
    <Paper

      elevation={0}
      sx={{
        
        width: '90%',
        mb: 2,

    
        border: 1,

        borderRadius: 5,
        p: 2,
        bgcolor: "rgb(230, 230, 230)",
        borderColor: "rgb(230, 230, 230)",
      
   
       
      }}
    >
  <Typography
  variant="body1"
  sx={{ 
    wordBreak: "break-word",
    whiteSpace: 'pre-line' 
  }}
>
        {text}
      </Typography>
    </Paper>
  );
}