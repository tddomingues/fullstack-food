import { useEffect } from "react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { getProductsByCategory } from "../../../slice/productSlice";
import { ProductProps } from "../../../interfaces/ProductProps";
import { AppDispatch, IRootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";

const Pizzas = () => {
  const dispatch = useDispatch<AppDispatch>();

  const products: ProductProps[] = useSelector<IRootState, ProductProps[]>(
    (state) => state.product.products,
  );

  useEffect(() => {
    dispatch(getProductsByCategory("pizza"));
  }, [dispatch]);

  return <ProductCard products={products} />;
};

export default Pizzas;
