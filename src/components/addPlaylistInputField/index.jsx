/** @format */

import { Box, TextField, Button, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useStoreActions } from "easy-peasy";
import { useState } from "react";

import { tokens } from "../../theme";
const AddANewPlaylistInputForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const [playlistId, setPlaylistId] = useState("");
  const { getData } = useStoreActions((action) => action.playlists);
  const handleSubmit = () => {
    getData(playlistId);
    setPlaylistId("");
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const url = "https://";
    if (!value.startsWith(url)) {
      setPlaylistId(value);
    } else {
      const params = new URL(value).searchParams;
      const id = params.get("list");
      setPlaylistId(id);
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={isNonMobile ? "20px 20%" : "10px 0 20px 0"}
      gap="20px"
    >
      <TextField
        fullWidth
        type="text"
        label="playlist Id or link"
        color="secondary"
        placeholder="enter a youtube playlist id or link"
        sx={{}}
        value={playlistId}
        onChange={handleChange}
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
