import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../api/api";
import { typographyStyle } from "../CustomStyles/Typography";

import type { ProductType } from "../Types/ProductType";

import {
  addToFavorites,
  removeFromFavorites,
} from "../features/favoritesSlice";

import { addToCart, removeCartItem } from "../features/cartSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import { FavouritesButton } from "./FavouritesButton";
import { TextButton } from "./TextButton";

interface Props {
  product: ProductType;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.favorites);
  const { cart } = useAppSelector((state) => state.cart);
  const [isLiked, setIsLiked] = useState(
    favorites.some((favProduct) => favProduct.itemId === product.itemId),
  );

  const isInCart = cart.some((cartItem) => cartItem.id === product.itemId);

  const toggleFavorite = useCallback(() => {
    if (isLiked) {
      dispatch(removeFromFavorites(product.itemId));
      setIsLiked(false);
    } else {
      dispatch(addToFavorites(product));
      setIsLiked(true);
    }
  }, [dispatch, isLiked, product]);

  const handleCartButton = () => {
    if (!isInCart) {
      dispatch(addToCart(product));

      return;
    }

    dispatch(removeCartItem(product.itemId));
  };

  return (
    <div className="flex w-[272px] flex-col border border-Elements p-6 transition-all hover:border hover:border-Primary">
      <Link to={`/phones/${product.itemId}`}>
        <img
          className="h-[208px] w-[208px] self-center object-contain"
          src={`${baseUrl}/_new/${product.image}`}
          alt=""
        />
      </Link>

      <hr className="h-6 border-0" />

      <Link
        to={`/phones/${product.itemId}`}
        className={`flex h-[42px] w-[224px] items-center ${typographyStyle.bodyText}`}
      >
        {product.name}
      </Link>

      <hr className="h-2 border-0" />

      <div className={`flex gap-2 ${typographyStyle.h2}`}>
        <div className="font-bold leading-[140%] ">${product.price}</div>
        <div className="relative font-medium text-Secondary line-through ">
          ${product.fullPrice}
        </div>
      </div>

      <hr className="mb-4 mt-2 border" />

      <div className="flex flex-col gap-y-2">
        <div className={`flex justify-between ${typographyStyle.button}`}>
          <div className="text-Secondary">Screen</div>
          <div>{product.screen}</div>
        </div>

        <div className={`flex justify-between ${typographyStyle.button}`}>
          <div className="text-Secondary">Capacity</div>
          <div>{product.capacity}</div>
        </div>

        <div className={`flex justify-between ${typographyStyle.button}`}>
          <div className="text-Secondary">RAM</div>
          <div>{product.ram}</div>
        </div>
      </div>

      <hr className="mb-4 border-0" />

      <div className={`flex h-10 gap-2 ${typographyStyle.button}`}>
        <TextButton active={isInCart} onClick={handleCartButton}>
          {`${!isInCart ? "Add to cart" : "Remove from cart"}`}
        </TextButton>

        <div className="w-10 shrink-0">
          <FavouritesButton active={isLiked} onClick={toggleFavorite} />
        </div>
      </div>
    </div>
  );
};
