//components
import ProductCard from "../../../components/ProductCard";
import Loading from "../../../components/Loading";
import { useProduct } from "../../../hooks/useProduct";

const Burguers = () => {
  const { products, loading } = useProduct({ category: "burguer" });

  if (loading) return <Loading />;

  return <ProductCard products={products} />;
};

export default Burguers;
