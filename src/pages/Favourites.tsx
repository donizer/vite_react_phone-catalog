/* eslint-disable no-constant-condition */
import { Link } from "react-router-dom";
import { ProductCard } from "../Components/ProductCard";
import { typographyStyle } from "../CustomStyles/Typography";

import { useAppSelector } from "../app/hooks";

import homeIco from "../assets/Icons/Home.svg";
import rightIco from "../assets/Icons/Chevron (Arrow Right).svg";

export const Favourites = () => {
  const { favorites } = useAppSelector((state) => state.favorites);

  return (
    <>
      <hr className="col-span-full mb-6 border-0" />

      <div
        className={`col-span-full flex h-4 items-center gap-x-2 text-Secondary ${typographyStyle.smallText}`}
      >
        <Link to="/">
          <img src={homeIco} alt="home" />
        </Link>

        <img src={rightIco} alt=">" />

        <span className="capitalize">favourites</span>
      </div>

      <hr className="col-span-full mb-10 border-0" />

      <h1 className={`col-span-full capitalize ${typographyStyle.h1}`}>
        favourites
      </h1>

      <p className={`col-span-full text-Secondary ${typographyStyle.bodyText}`}>
        {`${favorites.length} ${favorites.length === 1 ? "model" : "models"}`}
      </p>

      <hr className="col-span-full mb-6 border-0" />

      {!favorites.length ? (
        <div className="col-span-full">
          Products you chose as favourites will appear here
        </div>
      ) : (
        <div className="col-span-full grid grid-cols-4 gap-4">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};
