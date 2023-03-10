/** @format */

import { useState } from "react";
import { useStoreActions } from "easy-peasy";
import { Box, Typography, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { tokens } from "../../theme";

const PlaylistForm = ({ open, handleClose }) => {
  const [state, setState] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { getData } = useStoreActions((actions) => actions.playlists);
  const handleSubmit = () => {
    getData(state);
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ background: colors.primary[500] }}>
        <DialogTitle>
          <Typography>Add a new youtube playlist</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please type your youtube playlist link or id.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Playlist Id or Link"
            type="text"
            fullWidth
            variant="standard"
            color="secondary"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="secondary">
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} variant="secondary">
            Add
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
export default PlaylistForm;
