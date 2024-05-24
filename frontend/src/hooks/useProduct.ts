import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store";
import { useEffect } from "react";
import {
  getProducts,
  getProductsByCategory,
  reset,
} from "../slice/productSlice";
import { ProductProps } from "../interfaces/ProductProps";

export const useProduct = ({ category }: { category?: string }) => {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector<IRootState, ProductProps[]>(
    (state) => state.product.products,
  );

  const success = useSelector<IRootState, string | null>(
    (state) => state.product.success,
  );

  const error = useSelector<IRootState, string[] | null>(
    (state) => state.product.error,
  );

  const loading = useSelector<IRootState, boolean>(
    (state) => state.product.loading,
  );

  useEffect(() => {
    dispatch(reset());

    if (category !== undefined) {
      dispatch(getProductsByCategory(category || ""));
    } else {
      dispatch(getProducts());
    }
  }, [dispatch, category]);

  return { success, error, loading, products };
};
