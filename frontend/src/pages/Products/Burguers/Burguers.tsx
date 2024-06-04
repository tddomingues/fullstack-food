//components
import ProductCard from "../../../components/ProductCard";
import Loading from "../../../components/Loading";
import { useProducts } from "../../../hooks/useProducts";

const Burguers = () => {
  const { products, loading } = useProducts();

  const productsBurguer = products.filter((product) => {
    return product.category === "burguer";
  });

  if (loading) return <Loading />;

  return <ProductCard products={productsBurguer} />;
};

export default Burguers;
