/* eslint-disable max-len */
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { appContext, AppContextType } from "./AppContext";

import type { ProductType } from "../Types/ProductType";
import type { PhoneType } from "../Types/PhoneType";
import { CartItem } from "../Types/CartItem";

type Props = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<ProductType[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<ProductType[]>([]);
  const [currentItem, setCurrentItem] = useState<PhoneType | null>(null);
  const [modalInfo, setModalInfo] = useState("");
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart", []);
  const [favorites, setFavorites] = useLocalStorage<ProductType[]>(
    "favorites",
    [],
  );

  const searchQuery = searchParams.get("query");
  const perPage = searchParams.get("per-page") || "8";
  const sortBy = searchParams.get("sort-by") || "year";
  const page = searchParams.get("page") || "1";

  const state: AppContextType = {
    products,
    setProducts,
    categoryProducts,
    setCategoryProducts,
    visibleProducts,
    setVisibleProducts,
    currentItem,
    setCurrentItem,
    searchParams,
    setSearchParams,
    favorites,
    setFavorites,
    cartItems,
    setCartItems,
    modalInfo,
    setModalInfo,
  };

  useEffect(() => {
    setCategoryProducts([])
    const preparedVisibleProducts = products.filter((product) => {
      return pathname.includes(product.category);
    });

    setCategoryProducts(preparedVisibleProducts);
  }, [products, pathname]);

  const sortProducts = (productsToSort: ProductType[], sortType: string) => {
    switch (sortType) {
      case "year":
        return productsToSort.sort((a, b) => {
          const yearComparison = b.year - a.year;
          const priceComparison = b.price - a.price;

          return yearComparison !== 0 ? yearComparison : priceComparison;
        });
      case "price":
        return productsToSort.sort((a, b) => a.price - b.price);
      case "name":
        return productsToSort.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
        );
      default:
        return productsToSort;
    }
  };

  useEffect(() => {
    let preparedVisibleProducts = [...categoryProducts];

    if (searchQuery) {
      const handler = setTimeout(() => {
        preparedVisibleProducts = preparedVisibleProducts.filter((product) => {
          return product.name
            .toLowerCase()
            .includes(`${searchQuery}`.trim().toLowerCase());
        });
  
        setVisibleProducts(preparedVisibleProducts);
  
      }, 300)

      return () => {
        clearTimeout(handler)
      }
    }

    if (sortBy) {
      preparedVisibleProducts = sortProducts(preparedVisibleProducts, sortBy);
    }

    if (perPage !== "All") {
      const startIndex = (+page - 1) * +perPage;

      preparedVisibleProducts = preparedVisibleProducts.slice(
        startIndex,
        startIndex + +perPage,
      );
    }

    setVisibleProducts(preparedVisibleProducts);
  }, [categoryProducts, page, perPage, searchQuery, sortBy]);

  return <appContext.Provider value={state}>{children}</appContext.Provider>;
};
