import { createSlice } from "@reduxjs/toolkit";

const searchReducer = createSlice({
  name: "search",
  initialState: {
    value: 0,
  },
  reducers: {
    searchResult(state, action) {
      state.value = action.payload
    },
  },
});

export const { searchResult} = searchReducer.actions;

export default searchReducer.reducer