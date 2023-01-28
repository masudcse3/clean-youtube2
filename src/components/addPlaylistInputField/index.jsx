/** @format */

import { Box, TextField, Button, useTheme } from "@mui/material";

import { useStoreActions } from "easy-peasy";
import { useState } from "react";

import { tokens } from "../../theme";
const AddANewPlaylistInputForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [playlistId, setPlaylistId] = useState("");
  const { getData } = useStoreActions((action) => action.playlists);
  const handleSubmit = () => {
    getData(playlistId);
    setPlaylistId("");
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p="10px 20%"
      gap="20px"
    >
      <TextField
        fullWidth
        type="text"
        label="Playlist Id"
        color="secondary"
        placeholder="enter a youtube playlist id or link"
        sx={{}}
        value={playlistId}
        onChange={(e) => setPlaylistId(e.target.value)}
      />
      <Button
        type="submit"
        size="large"
        variant="filled"
        color="secondary"
        sx={{
          width: "250px",
          height: "50px",
          color: "#fff",
          background: colors.blueAccent[800],
          "&:hover": {
            background: colors.blueAccent[700],
          },
        }}
        onClick={handleSubmit}
      >
        Add a new playlist
      </Button>
    </Box>
  );
};

export default AddANewPlaylistInputForm;
