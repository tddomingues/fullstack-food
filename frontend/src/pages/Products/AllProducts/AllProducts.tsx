//components
import ProductCard from "../../../components/ProductCard";
import Loading from "../../../components/Loading";
import { useProducts } from "../../../hooks/useProducts";

const AllProducts = () => {
  const { products, loading } = useProducts();

  if (loading) return <Loading />;

  return <ProductCard products={products} />;
};

export default AllProducts;
