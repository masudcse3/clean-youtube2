/** @format */

import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import SinglePlaylist from "../../components/playlists";

const Home = ({ playlists }) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  return (
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
      <SinglePlaylist playlists={playlists} />
    </Box>
  );
};

export default Home;
