/** @format */

import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import FavouritePlaylist from "../../components/favoritePlaylist";

const Favorite = () => {
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
        <FavouritePlaylist />
      </Box>
    </Box>
  );
};

export default Favorite;
