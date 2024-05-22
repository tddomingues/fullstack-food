import { useEffect } from "react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import {
  getProducts,
  getProductsByCategory,
} from "../../../slice/productSlice";
import { ProductProps } from "../../../interfaces/ProductProps";
import { AppDispatch, IRootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";

const Burguers = () => {
  const dispatch = useDispatch<AppDispatch>();

  const products: ProductProps[] = useSelector<IRootState, ProductProps[]>(
    (state) => state.product.products,
  );

  const loading = useSelector<IRootState, boolean>(
    (state) => state.product.loading,
  );

  useEffect(() => {
    dispatch(getProductsByCategory("burguer"));
  }, [dispatch]);

  if (loading) return <Loading />;

  return <ProductCard products={products} />;
};

export default Burguers;
