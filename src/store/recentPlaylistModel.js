/** @format */

import { action } from "easy-peasy";
const recentPlaylistModel = {
  items: [],
  addToRecent: action((state, payload) => {
    if (!state.items.includes(payload)) {
      state.items.push(payload);
    }
  }),
  removeFromRecent: action((state, payload) => {
    state.items = state.items.filter((item) => item !== payload);
  }),
};

export default recentPlaylistModel;
