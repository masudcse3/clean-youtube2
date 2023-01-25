/** @format */

import { useState, useEffect } from "react";

import getPlaylist from "../api";
import storage from "../utils/store";
const INITIAL_STATE = {
  playlists: {},
  recentList: [],
  favoriteList: [],
};
const LOCAL_STORAGE_DATA_KEY = "SAVE_PLAYLIST_TO_LOCAL_STORAGE";
const useYoutube = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const localStorageState = storage.get(LOCAL_STORAGE_DATA_KEY);
    if (localStorageState) {
      setState({ ...localStorageState });
    }
  }, []);

  useEffect(() => {
    if (state !== INITIAL_STATE) {
      storage.save(LOCAL_STORAGE_DATA_KEY, state);
    }
  }, [state]);

  const addToPlaylistsById = async (playlistId, force = false) => {
    if (state.playlists[playlistId] && !force) {
      alert("this playlist already there. please add another one");
      return;
    }
    try {
      setLoading(true);
      let result = await getPlaylist(playlistId);
      setState((prev) => ({
        ...prev,
        playlists: {
          ...prev.playlists,
          [playlistId]: result,
        },
      }));
      setErrors("");
    } catch (e) {
      setErrors("ERROR", e);
    } finally {
      setLoading(false);
      setErrors("");
    }
  };

  const addToRecents = (playlistId) => {
    setState((prev) => ({
      ...prev,
      recentList: [...state.recentList, playlistId],
    }));
  };
  const addToFavorite = (playlistId) => {
    console.log(state.favoriteList);
    setState((prev) => ({
      ...prev,
      favoriteList: [...state.favoriteList, playlistId],
    }));
  };
  const getPlaylistsByIds = (playlistids = []) => {
    return playlistids.map((id) => state.playlists[id]);
  };

  return {
    playlists: state.playlists,
    loading,
    errors,
    favoriteList: getPlaylistsByIds(state.favoriteList),
    recentList: getPlaylistsByIds(state.recentList),
    addToPlaylistsById,
    addToFavorite,
    addToRecents,
  };
};

export default useYoutube;
