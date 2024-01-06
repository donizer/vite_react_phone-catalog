import { useSearchParams } from "react-router-dom";

import type { ProductType } from "../Types/ProductType";

type SortedProductsReturnType = ProductType[];

export const useSortedProducts = (
  array: ProductType[],
): SortedProductsReturnType => {
  const [searchParams] = useSearchParams();
  let sortedProducts = [...array];

  const searchQuery = searchParams.get("query") ?? "";
  const currentPage = searchParams.get("page") ?? "1";
  const perPage =
    searchParams.get("perPage") === "all"
      ? Infinity
      : searchParams.get("perPage") ?? "16";
  const sortBy = searchParams.get("sortBy") ?? "year";

  const startIndex = +perPage * (+currentPage - 1);
  const endIndex = +perPage * +currentPage;

  if (searchQuery) {
    return sortedProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
    );
  }

  switch (sortBy) {
    case "year": {
      sortedProducts = sortedProducts.toSorted((a, b) => b.year - a.year);

      break;
    }
    case "price": {
      sortedProducts = sortedProducts.toSorted(
        (a, b) => a.fullPrice - b.fullPrice,
      );

      break;
    }
    case "name": {
      sortedProducts = sortedProducts.toSorted((a, b) => {
        const valueA = a.name.toLowerCase();
        const valueB = b.name.toLowerCase();

        if (valueA < valueB) {
          return -1;
        }
        if (valueA > valueB) {
          return 1;
        }
        return 0;
      });

      break;
    }
    default:
      break;
  }

  sortedProducts = sortedProducts.slice(startIndex, endIndex);

  return sortedProducts;
};
