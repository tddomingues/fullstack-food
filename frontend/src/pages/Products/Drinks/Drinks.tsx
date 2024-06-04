//components
import ProductCard from "../../../components/ProductCard";
import Loading from "../../../components/Loading";
import { useProducts } from "../../../hooks/useProducts";

const Drinks = () => {
  const { products, loading } = useProducts();

  if (loading) return <Loading />;

  const productsBurguer = products.filter((product) => {
    return product.category === "drink";
  });

  return <ProductCard products={productsBurguer} />;
};

export default Drinks;
