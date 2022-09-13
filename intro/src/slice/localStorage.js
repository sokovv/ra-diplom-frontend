import { createSlice } from "@reduxjs/toolkit";

const localStorageReducer = createSlice({
  name: "value",
  initialState: {
    value: [],
  },
  reducers: {
    localStorageResult(state, action) {
      state.value = action.payload;
    },
  },
});

export const { localStorageResult } = localStorageReducer.actions;

export default localStorageReducer.reducer;
