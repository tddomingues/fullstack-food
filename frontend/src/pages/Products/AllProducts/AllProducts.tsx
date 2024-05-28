//components
import ProductCard from "../../../components/ProductCard";
import Loading from "../../../components/Loading";
import { useProduct } from "../../../hooks/useProduct";

const AllProducts = () => {
  const { products, loading } = useProduct();

  if (loading) return <Loading />;

  return <ProductCard products={products} />;
};

export default AllProducts;
