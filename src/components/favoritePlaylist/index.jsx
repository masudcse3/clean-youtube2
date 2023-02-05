/** @format */
import { Typography } from "@mui/material";
import { useStoreState } from "easy-peasy";
import NothingFound from "../NothingFound";

import PlaylistCard from "../PlaylistCard";

const FavouritePlaylist = () => {
  const { data, isLoading } = useStoreState((state) => state.playlists);
  let { items } = useStoreState((state) => state.favorite);
  items = items.map((item) => data[item]);

  return items.length > 0 ? (
    items.map((playlist) => (
      <PlaylistCard
        playlist={playlist}
        key={playlist.playlistId}
        deleteItem={false}
      />
    ))
  ) : (
    <NothingFound title="No Favorite Playlists" />
  );
};

export default FavouritePlaylist;
