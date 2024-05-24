//components
import ProductCard from "../../../components/ProductCard";
import Loading from "../../../components/Loading";
import { useProduct } from "../../../hooks/useProduct";

const Pizzas = () => {
  const { products, loading } = useProduct({ category: "pizza" });

  if (loading) return <Loading />;

  return <ProductCard products={products} />;
};

export default Pizzas;
