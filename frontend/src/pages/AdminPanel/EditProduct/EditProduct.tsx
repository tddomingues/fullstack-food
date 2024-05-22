import { editProduct } from "../../../slice/productSlice";

import ProductFormSkeleton from "../../../components/ProductFormSkeleton";

const EditProduct = () => {
  return (
    <section className="flex">
      <ProductFormSkeleton dispatchType={editProduct} title="Editar Produto" />
    </section>
  );
};

export default EditProduct;
