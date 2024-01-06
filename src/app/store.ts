import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import cartReducer from "../features/cartSlice";
import favoritesReducer from "../features/favoritesSlice";
import phoneDataReducer from "../features/phoneDataSlice";
import productsReducer from "../features/productsSlice";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  products: productsReducer,
  phoneData: phoneDataReducer,
  favorites: favoritesReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
