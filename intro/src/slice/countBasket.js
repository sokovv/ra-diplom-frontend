import { createSlice } from "@reduxjs/toolkit";

const countBasketReducer = createSlice({
  name: "countBasket",
  initialState: {
    value: 0,
  },
  reducers: {
    countBasketResult(state, action) {
      state.value = action.payload
    },
  },
});

export const { countBasketResult} = countBasketReducer.actions;

export default countBasketReducer.reducer