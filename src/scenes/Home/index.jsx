/** @format */

import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import SinglePlaylist from "../../components/playlists";
import AddANewPlaylistInputForm from "../../components/addPlaylistInputField";
const Home = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Box>
      <AddANewPlaylistInputForm />
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gap="20px"
        sx={{
          "& > div": {
            gridColumn: isNonMobile ? undefined : "span 4",
          },
        }}
      >
        <SinglePlaylist />
      </Box>
    </Box>
  );
};

export default Home;
