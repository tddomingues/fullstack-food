//components
import ProductCard from "../../../components/ProductCard";
import Loading from "../../../components/Loading";
import { useProduct } from "../../../hooks/useProduct";

const Drinks = () => {
  const { products, loading } = useProduct({ category: "drink" });

  if (loading) return <Loading />;

  return <ProductCard products={products} />;
};

export default Drinks;
