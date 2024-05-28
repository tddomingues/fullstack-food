//components
import ProductCard from "../../../components/ProductCard";
import Loading from "../../../components/Loading";
import { useProduct } from "../../../hooks/useProduct";

const Drinks = () => {
  const { products, loading } = useProduct();

  if (loading) return <Loading />;

  const productsBurguer = products.filter((product) => {
    return product.category === "drink";
  });

  return <ProductCard products={productsBurguer} />;
};

export default Drinks;
