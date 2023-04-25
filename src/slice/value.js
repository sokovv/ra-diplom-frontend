import { createSlice } from "@reduxjs/toolkit";

const valueReducer = createSlice({
  name: "value",
  initialState: {
    value: '',
  },
  reducers: {
    valueResult(state, action) {
      state.value = action.payload
    },
  },
});

export const { valueResult} = valueReducer.actions;

export default valueReducer.reducer