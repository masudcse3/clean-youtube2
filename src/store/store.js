/** @format */

import { createStore, persist } from "easy-peasy";
import favoriteModel from "./favoriteModel";
import noteModel from "./noteModel";
import playlistModel from "./playlistModel";
import recentPlaylistModel from "./recentPlaylistModel";

const store = createStore({
  playlists: persist(playlistModel),
  recent: persist(recentPlaylistModel),
  favorite: persist(favoriteModel),
  notes: persist(noteModel),
});

export default store;
