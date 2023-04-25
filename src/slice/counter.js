import { createSlice } from "@reduxjs/toolkit";

const counterReducer = createSlice({
  name: "counter",
  initialState: {
    value: 1,
  },
  reducers: {
    increment(state) {
      if (state.value < 10) {
        state.value = state.value + 1;
      }
    },
    decrement(state) {
      if (state.value > 1) {
        state.value = state.value - 1;
      }
    },
  },
});

export const { increment, decrement } = counterReducer.actions;

export default counterReducer.reducer;
