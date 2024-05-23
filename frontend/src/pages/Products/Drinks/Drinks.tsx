import { useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../../store";
import { getProductsByCategory } from "../../../slice/productSlice";

//interfaces
import { ProductProps } from "../../../interfaces/ProductProps";

//components
import ProductCard from "../../../components/ProductCard";
import Loading from "../../../components/Loading";

const Drinks = () => {
  const dispatch = useDispatch<AppDispatch>();

  const products: ProductProps[] = useSelector<IRootState, ProductProps[]>(
    (state) => state.product.products,
  );

  const loading = useSelector<IRootState, boolean>(
    (state) => state.product.loading,
  );

  useEffect(() => {
    dispatch(getProductsByCategory("drink"));
  }, [dispatch]);

  if (loading) return <Loading />;

  return <ProductCard products={products} />;
};

export default Drinks;
