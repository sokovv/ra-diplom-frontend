import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  items: [],
  status: "idle",
};

export const postOrder = createAsyncThunk(
  "cart/postOrder",
  async (owner, { getState }) => {
    const { items } = getState().productsBasket
    const response = await fetch(`https://ra-diplom-beckend.onrender.com/api/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ owner, items }),
    });
    return response.ok;
  }
);

const productsBasketReducer = createSlice({
  name: "productsBasket",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = "idle";
    },
    productsBasketResult(state, action) {
      if (Array.isArray(action.payload)) {
        state.items = action.payload;
      } else {
        const { id, size, count } = action.payload;
        const item = state.items.findIndex(
          (item) => item.id === id && item.size === size
        );
        item === -1
          ? state.items.push(action.payload)
          : (state.items[item].count += count);
      }
    },
    removeCart(state, action) {
      const { id, size } = action.payload;
      const indexItem = state.items.findIndex(
        (item) => item.id === id && item.size === size
      );
      if (indexItem !== -1) {
        state.items.splice(indexItem, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.status = "pending";
      })
      .addCase(postOrder.rejected, (state) => {
        state.status = "error";
      })
      .addCase(postOrder.fulfilled, (state) => {
        state.items = [];
        state.status = "success";
      });
  },
});

export const { productsBasketResult, removeCart, resetStatus } =
  productsBasketReducer.actions;

export default productsBasketReducer.reducer;
