/** @format */

import { useStoreState, useStoreActions } from "easy-peasy";
import { useEffect } from "react";

const EasyTodo = () => {
  const playlistId = "PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl";
  const playlist = useStoreActions((actions) => actions.playlist);
  useEffect(() => {
    playlist.getPlaylistData(playlistId);
  }, []);
  return (
    <div>
      <h2>Easy Peasy Store</h2>
    </div>
  );
};

export default EasyTodo;
