/** @format */

import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import RecentPlaylistItems from "../../components/recentPlaylistItems";

const RecentPlaylists = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  return (
    <Box>
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
        <RecentPlaylistItems />
      </Box>
    </Box>
  );
};

export default RecentPlaylists;
