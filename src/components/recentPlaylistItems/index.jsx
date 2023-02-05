/** @format */

import { Typography } from "@mui/material";
import { useStoreState } from "easy-peasy";
import NothingFound from "../NothingFound";
import PlaylistCard from "../PlaylistCard";
const RecentPlaylistItems = () => {
  const { data } = useStoreState((state) => state.playlists);
  const { items } = useStoreState((state) => state.recent);
  let recentPlaylistIds = items.slice(-5);
  recentPlaylistIds = recentPlaylistIds.map((item) => data[item]);

  return recentPlaylistIds.length > 0 ? (
    recentPlaylistIds.map((playlist) => (
      <PlaylistCard
        playlist={playlist}
        key={playlist.playlistId}
        deleteItem={false}
      />
    ))
  ) : (
    <NothingFound title="No Recent Playlists" />
  );
};

export default RecentPlaylistItems;
