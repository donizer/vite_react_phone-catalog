import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { ProductType } from "../Types/ProductType";

export interface FavoritesState {
  favorites: ProductType[];
}

const initialState: FavoritesState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    clear(state) {
      state.favorites = [];
    },
    setFavorites(state, action: PayloadAction<ProductType[]>) {
      state.favorites = action.payload;
    },
    addToFavorites(state, action: PayloadAction<ProductType>) {
      state.favorites.push(action.payload);
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter(
        (favorite) => favorite.itemId !== action.payload,
      );
    },
  },
});

export const { clear, setFavorites, addToFavorites, removeFromFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
