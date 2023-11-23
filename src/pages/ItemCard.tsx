/* eslint-disable max-len */
import classNames from "classnames";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { typographyStyle } from "../CustomStyles/Typography";
import { PhoneType } from "../Types/PhoneType";
import { api, baseUrl } from "../api/api";
import { TextButton } from "../Components/TextButton";
import { FavouritesButton } from "../Components/FavouritesButton";
import { getHash } from "../utils/hash";
import { ProductsSlider } from "../Components/ProductsSlider";
import { appContext } from "../Contexts/AppContext";
import { ProductType } from "../Types/ProductType";

import leftIco from "../assets/Icons/Chevron (Arrow Left).svg";

type Props = {
  currentItem: PhoneType;
};

export const ItemCard: React.FC<Props> = ({ currentItem }) => {
  const { cartItems, setCartItems, favorites, setFavorites } =
    useContext(appContext);
  const { itemId, catalogueId } = useParams();
  const [isLiked, setIsLiked] = useLocalStorage(currentItem.id, false);
  const [showcaseImage, setShowcaseImage] = useState(currentItem.images[0]);
  const [suggestedProducts, setSuggestedProducts] = useState<ProductType[]>([]);
  const [product, setProduct] = useState<ProductType | null>(null);

  const toggleFavorite = () => {
    if (!product) {
      return;
    }

    if (isLiked) {
      setFavorites(
        favorites.filter((favProduct) => favProduct.itemId !== product.itemId),
      );
      setIsLiked(false);
    } else {
      setFavorites([...favorites, product]);
      setIsLiked(true);
    }
  };

  const addToCart = () => {
    if (!product) {
      return;
    }

    const cartItemIndex = cartItems.findIndex(
      (item) => item.product.itemId === currentItem.id,
    );

    if (cartItemIndex < 0) {
      setCartItems([
        ...cartItems,
        { quantity: 1, product, id: product.itemId },
      ]);
    } else {
      setCartItems([
        ...cartItems.slice(0, cartItemIndex),
        ...cartItems.slice(cartItemIndex + 1),
      ]);
    }
  };

  const getNumberInCart = () => {
    if (!product) {
      return;
    }

    const cartItemIndex = cartItems.findIndex(
      (item) => item.product.itemId === currentItem.id,
    );

    if (cartItemIndex < 0) {
      return null;
    }

    return cartItems[cartItemIndex].quantity;
  };

  useEffect(() => {
    const prodictsResponse = api.getSuggestedProducts();
    const productResponse = api.getProductById(currentItem.id);

    prodictsResponse.then(setSuggestedProducts);
    productResponse.then(setProduct);
  }, [currentItem.id]);

  return (
    <div className="col-span-full">
      <Link
        className={`text-Secondary hover:text-Primary flex w-min items-center gap-1 ${typographyStyle.smallText}`}
        to={`/catalogue/${catalogueId}`}
      >
        <img src={leftIco} alt="back" />
        Back
      </Link>

      <hr className="mb-4 border-0" />

      <h1 className={typographyStyle.h1}>{currentItem?.name}</h1>

      <hr className="mb-10 border-0" />

      <div className="flex flex-wrap gap-16">
        <div className="flex gap-4">
          <div className="flex h-[464px] flex-col gap-4">
            {currentItem &&
              currentItem.images.map((url) => {
                return (
                  <button
                    type="button"
                    className={classNames(
                      "border-Elements hover:border-Primary flex h-20 w-20 items-center justify-center border transition-all",
                      {
                        "border-Primary": url === showcaseImage,
                      },
                    )}
                    onClick={() => setShowcaseImage(url)}
                    key={url}
                  >
                    <img
                      className="h-16 w-16 object-contain"
                      src={`${baseUrl}/_new/${url}`}
                      alt=""
                    />
                  </button>
                );
              })}
          </div>

          <div className="flex h-[464px] w-[464px] items-center justify-center">
            <img
              className="h-[442px] w-[442px] object-contain"
              src={`${baseUrl}/_new/${showcaseImage}`}
              alt=""
            />
          </div>
        </div>

        <div>
          <div className="flex w-[320px] flex-col">
            <p className={`text-Secondary mb-2 ${typographyStyle.smallText}`}>
              Abilable colors
            </p>

            <div className="flex flex-wrap gap-2">
              {currentItem &&
                currentItem.colorsAvailable.map((color) => (
                  <Link
                    to={`/catalogue/${catalogueId}/${itemId?.replace(
                      currentItem.color.toLowerCase(),
                      color.toLowerCase(),
                    )}`}
                    key={color}
                    className={classNames(
                      "border-Elements hover:border-Primary flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white transition-all",
                      { "border-Primary": currentItem.color === color },
                    )}
                  >
                    <div
                      className="h-6 w-6 rounded-full"
                      style={{
                        backgroundColor: color,
                      }}
                    />
                  </Link>
                ))}
            </div>

            <hr className="my-6" />

            <p className={`text-Secondary mb-2 ${typographyStyle.smallText}`}>
              Select capacity
            </p>

            <div className="flex gap-2">
              {currentItem &&
                currentItem.capacityAvailable.map((capacity) => (
                  <Link
                    to={`/catalogue/${catalogueId}/${itemId?.replace(
                      currentItem.capacity.toLowerCase(),
                      capacity.toLowerCase(),
                    )}`}
                    key={capacity}
                    className={classNames(
                      `border-Elements hover:border-Primary flex h-8 w-fit items-center justify-center border px-2 transition-all ${typographyStyle.button}`,
                      {
                        "border-Primary bg-Primary text-white":
                          currentItem.capacity === capacity,
                      },
                    )}
                  >
                    {capacity}
                  </Link>
                ))}
            </div>

            <hr className="my-6 mb-8" />

            <div className={`flex items-center gap-2 ${typographyStyle.h1}`}>
              <div className="font-bold leading-[140%] ">
                ${currentItem?.priceDiscount}
              </div>
              
              <div
                className={`text-Secondary relative font-medium line-through ${typographyStyle.h2}`}
              >
                ${currentItem?.priceRegular}
              </div>
            </div>

            <div className={`flex h-12 gap-2 ${typographyStyle.button}`}>
              <TextButton active={!!getNumberInCart()} onClick={addToCart}>
                {`${!getNumberInCart() ? "Add to cart" : "Remove from cart"}`}
              </TextButton>

              <div className="h-12 w-12 shrink-0">
                <FavouritesButton active={isLiked} onClick={toggleFavorite} />
              </div>
            </div>

            <hr className="h-8 border-0" />

            <div className="flex flex-col gap-y-2">
              <div className={`flex justify-between ${typographyStyle.button}`}>
                <div className="text-Secondary">Screen</div>
                <div>{currentItem?.screen}</div>
              </div>

              <div className={`flex justify-between ${typographyStyle.button}`}>
                <div className="text-Secondary">Resolution</div>
                <div>{currentItem?.resolution}</div>
              </div>

              <div className={`flex justify-between ${typographyStyle.button}`}>
                <div className="text-Secondary">Processor</div>
                <div>{currentItem?.processor}</div>
              </div>

              <div className={`flex justify-between ${typographyStyle.button}`}>
                <div className="text-Secondary">RAM</div>
                <div>{currentItem?.ram}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="h-20 border-0" />

      <div className="flex flex-wrap gap-16">
        <div className="w-[560px]">
          <h2 className={typographyStyle.h2}>About</h2>

          <hr />

          {currentItem?.description.map((descBody) => (
            <Fragment key={getHash(descBody.title)}>
              <h3 className={`mb-4 mt-8 ${typographyStyle.h3}`}>
                {descBody.title}
              </h3>

              <div
                className={`text-Secondary flex flex-col gap-y-8 ${typographyStyle.bodyText}`}
              >
                {descBody.text.map((paragraph) => (
                  <p key={getHash(paragraph)}>{paragraph}</p>
                ))}
              </div>
            </Fragment>
          ))}
        </div>

        <div className="w-[512px]">
          <h2 className={typographyStyle.h2}>Tech specs</h2>

          <hr className="mb-6" />

          <div className="flex flex-col gap-y-2">
            <div className={`flex justify-between ${typographyStyle.bodyText}`}>
              <div className="text-Secondary">Screen</div>
              <div>{currentItem?.screen}</div>
            </div>

            <div className={`flex justify-between ${typographyStyle.bodyText}`}>
              <div className="text-Secondary">Resolution</div>
              <div>{currentItem?.resolution}</div>
            </div>

            <div className={`flex justify-between ${typographyStyle.bodyText}`}>
              <div className="text-Secondary">Processor</div>
              <div>{currentItem?.processor}</div>
            </div>

            <div className={`flex justify-between ${typographyStyle.bodyText}`}>
              <div className="text-Secondary">RAM</div>
              <div>{currentItem?.ram}</div>
            </div>

            <div className={`flex justify-between ${typographyStyle.bodyText}`}>
              <div className="text-Secondary">Built in memory</div>
              <div>{currentItem?.capacity}</div>
            </div>

            <div className={`flex justify-between ${typographyStyle.bodyText}`}>
              <div className="text-Secondary">Camera</div>
              <div>{currentItem?.camera}</div>
            </div>

            <div className={`flex justify-between ${typographyStyle.bodyText}`}>
              <div className="text-Secondary">Cell</div>
              <div>{currentItem?.cell.slice(0, 3).join(", ")}</div>
            </div>
          </div>
        </div>
      </div>

      <hr className="h-20 border-0" />

      <ProductsSlider products={suggestedProducts} title="You may also like" />
    </div>
  );
};