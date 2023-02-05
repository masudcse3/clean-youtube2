/** @format */
import { Box, Typography } from "@mui/material";
import { useStoreState } from "easy-peasy";
import NothingFound from "../NothingFound";

import PlaylistCard from "../PlaylistCard";

const SinglePlaylist = () => {
  const { data, isLoading } = useStoreState((state) => state.playlists);

  let playlistsArr = Object.keys(data);
  playlistsArr = playlistsArr.map((id) => {
    const { playlistId, playlistTitle, playlistDescription, thumbnail } =
      data[id];
    return {
      playlistId,
      playlistTitle,
      playlistDescription,
      thumbnail,
    };
  });

  return playlistsArr.length > 0 ? (
    playlistsArr.map((playlist) => (
      <PlaylistCard
        playlist={playlist}
        key={playlist.playlistId}
        deleteItem={true}
      />
    ))
  ) : (
    <NothingFound title="Playlist is Empty. Please add a new One" />
  );
};

export default SinglePlaylist;
