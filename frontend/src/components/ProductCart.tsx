//styles
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

//utils
import formatCurrency from "../utils/formatCurrency";

//interfaces
import { CartProps } from "../interfaces/CartProps";
import { quantityOfProducts } from "../utils/ManipulateCartInfo";

//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store";
import {
  addQuantityOfProductsInCart,
  reducerQuantityOfProductsInCart,
  removeItemToCart,
} from "../slice/cartSlice";

const ProductCart = () => {
  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector<IRootState, CartProps[]>((state) => state.cart.cart);

  const handleAddQuantityOfProductsInCart = (product: CartProps) => {
    dispatch(addQuantityOfProductsInCart(product));
  };

  const handleReducerQuantityOfProductsInCart = (product: CartProps) => {
    dispatch(reducerQuantityOfProductsInCart(product));
  };

  const handleRemoveProduct = (product: CartProps) => {
    dispatch(removeItemToCart(product));
  };

  const handleQuantityOfProducts = quantityOfProducts(cart);

  return (
    <div className="overflow-y-auto flex-1">
      <div className="flex flex-col gap-4">
        {handleQuantityOfProducts === 0 && (
          <p className="font-semibold">Vazio</p>
        )}
        {cart &&
          cart.map((productCart) => (
            <div
              className="flex justify-between items-center bg-neutral-900 rounded-md p-2"
              key={productCart._id}
            >
              <div className="flex gap-2 items-center">
                <div className="w-[70px] h-[70px] ">
                  <img
                    src={`http://localhost:3000/uploads/${productCart.imageUrl}`}
                    alt={productCart.description}
                    className="object-contain w-full h-full rounded-md "
                  />
                </div>
                <div>
                  <h4 className="font-normal text-sm text-neutral-300">
                    {productCart.name}
                  </h4>
                  <span className="font-bold text-sm">
                    {formatCurrency(Number(productCart.subTotalPrice))}
                  </span>
                  <span
                    className="mt-1 block cursor-pointer text-sm text-destructive hover:text-destructive/90"
                    onClick={() => handleRemoveProduct(productCart)}
                  >
                    Deletar
                  </span>
                </div>
              </div>

              <div className="bg-neutral-800 rounded-md flex items-center justify-between gap-6 p-2 min-w-[80px]">
                <span>{productCart.quantity}</span>
                <div className="flex flex-col items-center">
                  <span
                    className="cursor-pointer bg-neutral-800"
                    onClick={() =>
                      handleAddQuantityOfProductsInCart(productCart)
                    }
                  >
                    <IoMdArrowDropup />
                  </span>
                  <span
                    className="cursor-pointer bg-neutral-800"
                    onClick={() =>
                      handleReducerQuantityOfProductsInCart(productCart)
                    }
                  >
                    <IoMdArrowDropdown />
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductCart;
