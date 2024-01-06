/* eslint-disable max-len */

import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import { ItemCard } from "./ItemCard";
import { Loader } from "../Components/Loader";
import { fetchPhoneData } from "../features/phoneDataSlice";
import { scrollToTop } from "../utils/scrollToTop";

export const ItemPage = () => {
  const dispatch = useAppDispatch();
  const { itemId } = useParams();
  const { phoneData, loaded } = useAppSelector((state) => state.phoneData);

  useEffect(() => {
    void dispatch(fetchPhoneData(itemId));

    scrollToTop();
  }, [dispatch, itemId]);

  return (
    <>
      {!loaded || !phoneData ? (
        <Loader />
      ) : (
        <ItemCard currentItem={phoneData} />
      )}
    </>
  );
};
