/* eslint-disable max-len */

import { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import { appContext } from "../Contexts/AppContext";
import { Loader } from "../Components/Loader";

import { scrollToTop } from "../utils/scrollToTop";
import { ItemCard } from "./ItemCard";

export const ItemPage = () => {
  const { itemId } = useParams();
  const { currentItem, setCurrentItem } = useContext(appContext);
  const [isLoading, setIsLoading] = useState(false);

  const fetchItem = useCallback(async () => {
    setCurrentItem(null);
    setIsLoading(true);

    try {
      const data = await api.getInfo.phone(itemId);

      setCurrentItem(data);
    } catch {
      setCurrentItem(null);
    } finally {
      setIsLoading(false);
    }
  }, [itemId, setCurrentItem]);

  useEffect(() => {
    scrollToTop();

    fetchItem();
  }, [fetchItem, itemId]);

  return (
    <>
      {isLoading || !currentItem ? (
        <Loader />
      ) : (
        <ItemCard currentItem={currentItem} />
      )}
    </>
  );
};
