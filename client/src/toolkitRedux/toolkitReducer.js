import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  bgDark: false,
};

export const setBgDark = createAction('SET_BG_DARK');

export default createReducer(initialState, (builder) => {
  builder.addCase(setBgDark, (state) => {
    state.bgDark = !state.bgDark;
  });
});
