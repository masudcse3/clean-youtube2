/** @format */

import { action } from "easy-peasy";

const noteModel = {
  data: {},

  newNotes: action((state, payload) => {
    state.data[payload.id] = payload.notes;
  }),
};
export default noteModel;
