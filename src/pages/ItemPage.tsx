/* eslint-disable max-len */

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../Components/Loader";

import { scrollToTop } from "../utils/scrollToTop";
import { ItemCard } from "./ItemCard";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchPhoneData } from "../features/phoneDataSlice";

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
