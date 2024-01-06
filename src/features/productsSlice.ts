import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../Types/ProductType";
import { api } from "../api/api";


export interface ProductsState {
  products: ProductType[];
  visibleProducts: ProductType[];
  status: "idle" | "loading" | "failed";
  hasError: boolean;
  loaded: boolean;
}

const initialState: ProductsState = {
  products: [],
  visibleProducts: [],
  status: "idle",
  hasError: false,
  loaded: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (productType: string | undefined) => {
    switch (productType) {
      case "phones": {
        const posts = await api.getPhones();

        return posts;
      }
      case "accesories":
      case "tablets":
      default:
        return [];
    }
  },
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clear(state) {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.visibleProducts = action.payload;
        state.loaded = true;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { clear } = productsSlice.actions;
export default productsSlice.reducer;
