import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import { CartItem } from "../Types/CartItem";
import { ProductType } from "../Types/ProductType";

export interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clear(state) {
      state.cart = [];
    },
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.cart = action.payload;
    },
    addToCart(state, action: PayloadAction<ProductType>) {
      const newCartItem: CartItem = {
        id: action.payload.itemId,
        quantity: 1,
        product: action.payload,
      };

      state.cart.push(newCartItem);
    },
    addOneToCartItem(state, action: PayloadAction<string>) {
      const item = state.cart.find((elem) => elem.id === action.payload);

      if (item) {
        item.quantity++;
      }
    },
    removeOneFromCartItem(state, action: PayloadAction<string>) {
      const item = state.cart.find((elem) => elem.id === action.payload);

      if (item) {
        item.quantity--;
      }
      if (item && !item.quantity) {
        state.cart = state.cart.filter(
          (cartItem) => cartItem.id !== action.payload,
        );
      }
    },
    removeCartItem(state, action) {
      state.cart = state.cart.filter(
        (cartItem) => cartItem.id !== action.payload,
      );
    },
  },
});

export const {
  clear,
  setCartItems,
  addToCart,
  addOneToCartItem,
  removeOneFromCartItem,
  removeCartItem,
} = cartSlice.actions;
export default cartSlice.reducer;
