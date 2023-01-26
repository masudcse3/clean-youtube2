/** @format */

import { action, thunk } from "easy-peasy";
import getPlaylist from "../api";
const playlistModel = {
  id: "",
  title: "",
  description: "",
  thumbnail: "",
  channelTitle: "",
  channelId: "",
  items: [],
  setPlaylistData: action((state, payload) => {
    state = { ...payload };
    return state;
  }),
  getPlaylistData: thunk(async ({ setPlaylistData }, payload) => {
    const {
      channelId,
      playlistTitle,
      playlistId,
      playlistDescription,
      thumbnail,
      channelTitle,
      items,
    } = await getPlaylist(payload);
    setPlaylistData({
      id: playlistId,
      title: playlistTitle,
      description: playlistDescription,
      thumbnail,
      channelId,
      channelTitle,
      items,
    });
  }),
};

export default playlistModel;
