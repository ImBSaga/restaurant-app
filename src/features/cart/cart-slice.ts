import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/types/cart.type";

// Initial State
type CartState = { items: CartItem[] };
const initialState: CartState = {
  items: [],
};

// Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<{ cartItem: CartItem }>) => {
      const { cartItem } = action.payload;
      state.items.push(cartItem);
    },
    removeItemFromCart: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    updateCartQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: action.payload.quantity,
          };
        }
        return item;
      });
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateCartQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
