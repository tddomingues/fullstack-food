import BurgerImage from "../../assets/burguer.png";
import { ProductProps } from "../../interfaces/ProductProps";

import { FaStar } from "react-icons/fa";
import formatCurrency from "../../utils/formatCurrency";

interface ProductCardProps {
  products: ProductProps[];
}

const ProductCard = ({ products }: ProductCardProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 ">
      {products &&
        products.slice(0, 4).map((product, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 max-w-[300px] relative justify-self-center"
          >
            <div className="border border-neutral-200 rounded-md ">
              <img
                src={BurgerImage}
                alt=""
                className="transition ease-in-out delay-100 hover:scale-105"
              />
            </div>
            <h3 className="font-semibold">{product.name}</h3>
            <div className="self-start">
              <strong className="font-semibold">
                {formatCurrency(Number(product.price))}
              </strong>
            </div>
            <div className="bg-destructive p-2 rounded-md mt-2 text-center cursor-pointer transition ease-in-out delay-100 hover:bg-destructive/90">
              <strong className="font-semibold text-neutral-50 ">
                Adicionar
              </strong>
            </div>
            <div className="absolute top-2 right-2 flex items-center gap-1">
              <FaStar className="text-yellow-500" />
              <span className="text-xs">7/10</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductCard;
