/** @format */
import {} from "react";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";

import { Route, Routes } from "react-router-dom";
import useYoutube from "./hooks/useYoutube";
import { ColorModeContext, useMode } from "./theme";
import Appbar from "./scenes/global/Appbar";
import Home from "./scenes/Home";
import SinglePlaylistItem from "./scenes/singlePlaylistItem";
import EasyTodo from "./scenes/EasyTodo";

const NotFound = () => {
  return <h2>404 Not Found</h2>;
};
function App() {
  const [theme, colorMode] = useMode();
  const { addToPlaylistsById, playlists } = useYoutube();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Appbar addNewPlaylist={addToPlaylistsById} />
        <EasyTodo />
        <Box p="20px">
          <Routes>
            <Route path="/" element={<Home playlists={playlists} />} />
            <Route
              path="/playlist/:playlistId"
              element={<SinglePlaylistItem playlists={playlists} />}
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
