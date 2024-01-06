import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";

import { PhoneType } from "../Types/PhoneType";

export interface PhoneDataState {
  phoneData: PhoneType | null;
  status: "idle" | "loading" | "failed";
  hasError: boolean;
  loaded: boolean;
}

const initialState: PhoneDataState = {
  phoneData: null,
  status: "idle",
  hasError: false,
  loaded: false,
};

export const fetchPhoneData = createAsyncThunk(
  "phoneData/getPhoneData",
  async (id: string | undefined) => {
    const posts = await api.getPhoneData(id);

    return posts;
  },
);

export const phoneDataSlice = createSlice({
  name: "phoneData",
  initialState,
  reducers: {
    clear(state) {
      state.phoneData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhoneData.pending, (state) => {
        state.status = "loading";
        state.loaded = false;
        state.hasError = false;
        state.phoneData = null;
      })
      .addCase(fetchPhoneData.fulfilled, (state, action) => {
        state.status = "idle";
        state.phoneData = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPhoneData.rejected, (state) => {
        state.status = "failed";
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { clear } = phoneDataSlice.actions;
export default phoneDataSlice.reducer;
