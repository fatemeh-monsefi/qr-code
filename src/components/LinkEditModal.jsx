import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function LinkEditModal({
  open,
  handleClose,
  handleEdit,
  currentLink,
}) {
  const [newLink, setNewLink] = useState("");

  useEffect(() => {
    if (currentLink) {
      setNewLink(currentLink.link);
    }
  }, [currentLink]);

  const onEditClick = () => {
    handleEdit(newLink);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Link</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ color: "black", marginBottom: "1rem" }}>
          Update the link below and click "Edit" to save changes.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Link"
          type="url"
          fullWidth
          variant="outlined"
          sx={{ minHeight: "5rem" }}
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
          error={
            newLink?.length > 0 &&
            !newLink.startsWith("http://") &&
            !newLink.startsWith("https://")
          }
          helperText={
            newLink?.length > 0 &&
            !newLink.startsWith("http://") &&
            !newLink.startsWith("https://")
              ? "URL must start with http or https"
              : ""
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onEditClick();
          }}
          color="secondary"
          disabled={
            newLink?.length > 0 &&
            !newLink.startsWith("http://") &&
            !newLink.startsWith("https://")
          }
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
