/* eslint-disable max-len */
import { useEffect, useState } from "react";

import { api, baseUrl } from "../api/api";
import type { ProductType } from "../Types/ProductType";

import { Carousel } from "../Components/Carousel";
import { ProductsSlider } from "../Components/ProductsSlider";
import { ShopByCategory } from "../Components/ShopByCategory";

const images = [
  {
    url: `${baseUrl}/_new/img/banner-phones.png`,
    to: "phones",
  },
  {
    url: `${baseUrl}/_new/img/banner-tablets.png`,
    to: "tablets",
  },
  {
    url: `${baseUrl}/_new/img/banner-accessories.png`,
    to: "accessories",
  },
];

export const Home = () => {
  const [expensivePhones, setExpensivePhones] = useState<ProductType[]>([]);
  const [cheapPhones, setCheapPhones] = useState<ProductType[]>([]);

  useEffect(() => {
    void api.getExpensivePhones().then(setExpensivePhones);
    void api.getCheapPhones().then(setCheapPhones);
  }, []);

  return (
    <>
      <hr className="col-span-full h-10 border-0" />
      <Carousel itemWidth={1040} itemHeight={400} images={images} infinite />

      <hr className="col-span-full h-[72px] border-0" />

      <ProductsSlider products={cheapPhones} title="Hot Prices" />

      <hr className="col-span-full h-[72px] border-0" />

      <ShopByCategory />

      <hr className="col-span-full h-[72px] border-0" />

      <ProductsSlider products={expensivePhones} title="Brand new models" />

      <hr className="col-span-full h-[80px] border-0" />
    </>
  );
};
