/* eslint-disable max-len */
import { CartItemCard } from "../Components/CartItem";
import { Link } from "react-router-dom";
import { TextButton } from "../Components/TextButton";
import { typographyStyle } from "../CustomStyles/Typography";

import {
  addOneToCartItem,
  removeCartItem,
  removeOneFromCartItem,
} from "../features/cartSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import leftIco from "../assets/Icons/Chevron (Arrow Left).svg";

export const Cart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  const getTotalPrice = () => {
    const totalPrice = cart.reduce(
      (prev, acc) => (acc.product.price + prev) * acc.quantity,
      0,
    );

    return totalPrice;
  };

  const getTotalItems = () => {
    const totalPrice = cart.reduce((prev, acc) => acc.quantity + prev, 0);

    return totalPrice;
  };

  const handleCheckout = () => {
    // setModalInfo("We are sorry, but this feature is not implemented yet");
  };

  return (
    <div className="col-span-full">
      <hr className="col-span-full h-10 border-0" />

      <Link
        className={`flex w-min items-center gap-1 text-Secondary hover:text-Primary ${typographyStyle.smallText}`}
        to="/"
      >
        <img src={leftIco} alt="back" />
        Back
      </Link>

      <hr className="col-span-full h-10 border-0" />

      <h1 className={`col-span-full capitalize ${typographyStyle.h1}`}>cart</h1>

      <hr className="col-span-full h-6 border-0" />

      {!cart.length ? (
        <div className="col-span-full">
          Products you chose to buy will appear here
        </div>
      ) : (
        <div className="flex gap-x-4">
          <div className="flex flex-col gap-y-4">
            {!!cart.length &&
              cart.map((item) => (
                <CartItemCard
                  increment={() => dispatch(addOneToCartItem(item.id))}
                  decrement={() => dispatch(removeOneFromCartItem(item.id))}
                  removeProduct={() => dispatch(removeCartItem(item.id))}
                  key={item.id}
                  cartItem={item}
                />
              ))}
          </div>

          <div className="h-[206px] w-[368px] border border-Elements p-6">
            <div className="flex flex-col items-center">
              <p className={typographyStyle.h1}>${`${getTotalPrice()}`}</p>
              <p className={`text-Secondary ${typographyStyle.smallText}`}>
                {`Total for ${getTotalItems()} ${
                  cart.length === 1 ? "item" : "items"
                }`}
              </p>
            </div>

            <hr className="my-6" />

            <div className="h-12 w-full">
              <TextButton onClick={handleCheckout}>Checkout</TextButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
