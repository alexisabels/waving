/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeletePost } from "../../hooks/post";

export default function PostMenu({ postId, showSnackbar }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleCloseMenu = () => setAnchorEl(null);
  const { deletePost } = useDeletePost();

  const handleDeletePost = () => {
    deletePost(postId)
      .then(() => {
        showSnackbar("Post eliminado correctamente", "success");
      })
      .catch((error) => {
        showSnackbar(`Error al eliminar el post: ${error.message}`, "error");
      });
    handleCloseMenu();
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{ color: "white", "&:hover": { color: "#bdbdbd" } }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{ "aria-labelledby": "long-button" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        PaperProps={{
          elevation: 4,
          sx: {
            minWidth: 130,
            backgroundColor: "#f0f0f0",
            "& .MuiMenuItem-root": {
              "&:hover": { backgroundColor: "#e0e0e0" },
            },
            borderRadius: 2,
            marginTop: 1.5,
          },
        }}
      >
        <MenuItem onClick={handleDeletePost}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Borrar post" />
        </MenuItem>
      </Menu>
    </>
  );
}
