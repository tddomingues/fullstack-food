import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store";
import { useEffect } from "react";
import { getProducts } from "../slice/productSlice";
import { ProductProps } from "../interfaces/ProductProps";

export const useProduct = () => {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector<IRootState, ProductProps[]>(
    (state) => state.product.products,
  );

  const product = useSelector<IRootState, ProductProps | undefined>(
    (state) => state.product.product,
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
    dispatch(getProducts());
  }, [dispatch]);

  return { success, error, loading, products, product };
};
