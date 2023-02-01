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
import Favorite from "./scenes/favorite";
import RecentPlaylists from "./scenes/recent";

const NotFound = () => {
  return <h2>404 Not Found</h2>;
};
function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Appbar />

        <Box p="20px">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/recent" element={<RecentPlaylists />} />
            <Route
              path="/playlist/:playlistId"
              element={<SinglePlaylistItem />}
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
