import { createContext } from "react";
import { ProductType } from '../Types/ProductType';
import { PhoneType } from '../Types/PhoneType';
import { CartItem } from '../Types/CartItem';

export type AppContextType = {
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  categoryProducts: ProductType[];
  setCategoryProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  visibleProducts: ProductType[];
  setVisibleProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  currentItem: PhoneType | null;
  setCurrentItem: React.Dispatch<React.SetStateAction<PhoneType | null>>;
  searchParams: URLSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
  favorites: ProductType[];
  setFavorites: React.Dispatch<React.SetStateAction<ProductType[]>>;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const DefaultAppValues: AppContextType = {
  products: [],
  setProducts: () => null,
  categoryProducts: [],
  setCategoryProducts: () => null,
  visibleProducts: [],
  setVisibleProducts: () => null,
  currentItem: null,
  setCurrentItem: () => null,
  searchParams: new URLSearchParams(),
  setSearchParams: () => null,
  favorites: [],
  setFavorites: () => null,
  cartItems: [],
  setCartItems: () => null,
};

export const appContext = createContext<AppContextType>(DefaultAppValues);
