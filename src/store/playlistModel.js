/** @format */

import { action, thunk } from "easy-peasy";
import getPlaylist from "../api";
const playlistModel = {
  data: {},
  isLoading: false,
  isError: "",
  setData: action((state, payload) => {
    state.data[payload.playlistId] = payload;
  }),
  setError: action((state, payload) => {
    state.isError = payload;
  }),
  setLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
  getData: thunk(
    async ({ setData, setError, setLoading }, playlistId, { getState }) => {
      if (getState().data[playlistId]) {
        alert("playlist already there");
        return;
      }
      setLoading(true);
      try {
        const playlists = await getPlaylist(playlistId);
        setData(playlists);
        setError("");
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
  ),
  deletePlaylist: action((state, payload) => {
    delete state.data[payload];
  }),
};

export default playlistModel;
