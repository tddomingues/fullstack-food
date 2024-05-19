//styles
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import BurgerImage from "../../assets/burguer.png";
//utils
import formatCurrency from "../../utils/formatCurrency";
//interfaces
import { CartProps } from "../../interfaces/CartProps";
//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../store";
import { addQuantity, removeItemToCart } from "../../slice/cartSlice";

const ProductCart = () => {
  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector<IRootState, CartProps[]>((state) => state.cart.cart);

  const handleQuantity = (product: CartProps, operation: string) => {
    if (operation === "sum") {
      dispatch(addQuantity({ product, quantity: product.quantity + 1 }));
    } else if (operation === "subtraction") {
      if (product.quantity > 1) {
        dispatch(
          addQuantity({
            product,
            quantity: product.quantity <= 1 ? 1 : product.quantity - 1,
          }),
        );
      } else if (product.quantity === 1) {
        dispatch(removeItemToCart(product));
      }
    }
  };

  const quantityOfProducts = cart.reduce((previous, current) => {
    return previous + current.quantity;
  }, 0);

  return (
    <div className="h-5/6 overflow-y-auto my-2">
      <div className="flex flex-col gap-3">
        {quantityOfProducts === 0 && <p className="font-semibold">Vazio</p>}
        {cart &&
          cart.map((productCart) => (
            <div
              className="flex justify-between items-center"
              key={productCart._id}
            >
              <div className="flex gap-2 items-center">
                <div className="w-[80px] border border-neutral-400 rounded-md ">
                  <img src={BurgerImage} alt="" />
                </div>
                <div className="">
                  <h4 className="font-semibold">{productCart.name}</h4>
                  <strong className="font-semibold">
                    {formatCurrency(Number(productCart.subTotalPrice))}
                  </strong>
                </div>
              </div>

              <div className="border border-neutral-400 rounded-md flex items-center justify-between gap-6 p-1 min-w-[80px]">
                <span>{productCart.quantity}</span>
                <div className="flex flex-col items-center gap-1">
                  <span
                    className="cursor-pointer bg-neutral-200"
                    onClick={() => handleQuantity(productCart, "sum")}
                  >
                    <IoMdArrowDropup />
                  </span>
                  <span
                    className="cursor-pointer bg-neutral-200"
                    onClick={() => handleQuantity(productCart, "subtraction")}
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
