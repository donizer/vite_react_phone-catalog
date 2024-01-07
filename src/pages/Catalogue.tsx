import { useCallback, useEffect } from "react";

import { Link, Outlet, useParams, useSearchParams } from "react-router-dom";
import { typographyStyle } from "../CustomStyles/Typography";
import { useDebounce } from "usehooks-ts";

import { fetchProducts } from "../features/productsSlice";

import { Loader } from "../Components/Loader";
import { Pagintaion } from "../Components/Pagintaion";
import { ProductCard } from "../Components/ProductCard";
import { Select } from "../Components/Select";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import homeIco from "../assets/Icons/Home.svg";
import rightIco from "../assets/Icons/Chevron (Arrow Right).svg";

import { useSortedProducts } from "../hooks/useSorted";

const sortByOptions = [
  { value: "year", label: "Newest" },
  { value: "name", label: "Alphabetically" },
  { value: "price", label: "Cheapest" },
];

const perPageOptions = [
  { value: "8", label: "8" },
  { value: "16", label: "16" },
  { value: "32", label: "32" },
  { value: "all", label: "All" },
];

export const Catalogue = () => {
  const dispatch = useAppDispatch();
  const { catalogueId, itemId } = useParams();
  const { products, visibleProducts, loaded } = useAppSelector(
    (state) => state.products,
  );
  const { phoneData } = useAppSelector((state) => state.phoneData);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortedProducts = useSortedProducts(visibleProducts);
  const debouncedProducts = useDebounce(sortedProducts, 250);

  const getProducts = useCallback(() => {
    void dispatch(fetchProducts(catalogueId));
  }, [catalogueId, dispatch]);

  const searchQuery = searchParams.get("query") ?? "";
  const currentPage = searchParams.get("page") ?? "1";
  const perPage = searchParams.get("perPage") ?? "16";
  const sortBy = searchParams.get("sortBy") ?? "year";
  const totalPages = Math.ceil(products.length / +perPage);

  const handleSelectChange = useCallback(
    (selectType: string, newValue: string) => {
      setSearchParams((prev) => {
        prev.set(selectType, newValue);
        prev.delete("page");

        return prev;
      });
    },
    [setSearchParams],
  );

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <>
      <hr className="col-span-full mb-6 border-0" />

      <div
        className={`col-span-full flex h-4 items-center gap-x-2 ${typographyStyle.smallText}`}
      >
        <Link to="/">
          <img src={homeIco} alt="home" />
        </Link>

        <img src={rightIco} alt={catalogueId} />

        <Link className="capitalize" to={`/${catalogueId}`}>
          {catalogueId}
        </Link>

        {!!itemId && (
          <>
            <img src={rightIco} alt="home" />

            <span className="text-Secondary">{phoneData?.name}</span>
          </>
        )}
      </div>

      <hr className="col-span-full mb-10 border-0" />

      {itemId ? (
        <Outlet />
      ) : (
        <>
          <h1 className={`col-span-full capitalize ${typographyStyle.h1}`}>
            {catalogueId}
          </h1>

          <p
            className={`col-span-full text-Secondary ${typographyStyle.bodyText}`}
          >
            {searchQuery && `found ${visibleProducts.length} models`}

            {!searchQuery && products.length === 0 && "not found"}

            {!searchQuery &&
              products.length !== 0 &&
              `${products.length} ${
                products.length === 1 ? "model" : "models"
              }`}
          </p>

          {!searchQuery && !!visibleProducts.length && (
            <>
              <hr className="col-span-full mb-10 border-0" />

              <form className="col-span-full flex">
                <div className="flex gap-x-4">
                  <div className="flex flex-col gap-y-1">
                    <label
                      className={`block text-Secondary ${typographyStyle.smallText}`}
                      id="aria-label"
                      htmlFor="aria-example-input"
                    >
                      Sort by
                    </label>

                    <Select
                      value={sortBy}
                      options={sortByOptions}
                      onChange={handleSelectChange}
                      selectType="sortBy"
                    />
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <label
                      className={`block text-Secondary ${typographyStyle.smallText}`}
                      id="aria-label"
                      htmlFor="aria-example-input"
                    >
                      Per page
                    </label>

                    <Select
                      value={perPage}
                      options={perPageOptions}
                      onChange={handleSelectChange}
                      selectType="perPage"
                      sm
                    />
                  </div>
                </div>
              </form>
            </>
          )}

          <hr className="col-span-full mb-6 border-0" />

          {!loaded || !debouncedProducts.length ? (
            <Loader />
          ) : (
            <div className="col-span-full grid grid-cols-4 gap-4">
              {debouncedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <hr className="col-span-full mb-10 border-0" />
        </>
      )}

      <hr className="col-span-full mb-20 border-0" />

      {currentPage &&
        !!totalPages &&
        !searchQuery &&
        !itemId &&
        !Number.isNaN(perPage || 8) && (
          <Pagintaion currentPage={+currentPage} totalPages={totalPages} />
        )}
    </>
  );
};
