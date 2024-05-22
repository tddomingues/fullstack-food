import { createProduct } from "../../../slice/productSlice";

import ProductFormSkeleton from "../../../components/ProductFormSkeleton";

const CreateProducts = () => {
  return (
    <section className="flex">
      <ProductFormSkeleton dispatchType={createProduct} title="Criar Produto" />
    </section>
  );
};

export default CreateProducts;
