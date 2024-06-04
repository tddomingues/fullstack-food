import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store";
import { useEffect } from "react";
import { IInitialState, getProducts } from "../slice/productSlice";

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { products, error, loading, product, success } = useSelector<
    IRootState,
    IInitialState
  >((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return { success, error, loading, products, product };
};
