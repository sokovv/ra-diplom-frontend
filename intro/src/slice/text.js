import { createSlice } from "@reduxjs/toolkit";

const textReducer = createSlice({
  name: "text",
  initialState: {
    value: '',
  },
  reducers: {
   textResult(state, action) {
      state.value = action.payload
    },
  },
});

export const { textResult} = textReducer.actions;

export default textReducer.reducer