//components
import ProductCard from "../../../components/ProductCard";
import Loading from "../../../components/Loading";
import { useProduct } from "../../../hooks/useProduct";
import { useState } from "react";

const Burguers = () => {
  const { products, loading } = useProduct();

  const productsBurguer = products.filter((product) => {
    return product.category === "burguer";
  });

  if (loading) return <Loading />;

  return <ProductCard products={productsBurguer} />;
};

export default Burguers;
