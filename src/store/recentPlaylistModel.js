/** @format */

import { action } from "easy-peasy";
const recentPlaylistModel = {
  items: [],
  addToRecent: action((state, payload) => {
    state.items.push(payload);
  }),
};

export default recentPlaylistModel;
