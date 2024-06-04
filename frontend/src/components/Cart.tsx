//components
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import ProductCart from "./ProductCart";
import { Button } from "./ui/button";

//styles
import { FaShoppingCart } from "react-icons/fa";

//utils
import formatCurrency from "../utils/formatCurrency";
import { quantityOfProducts, totalPrice } from "../utils/ManipulateCartInfo";

//hooks

//interfaces
import { CartProps } from "../interfaces/CartProps";

//router
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../store";

const Cart = () => {
  const navigate = useNavigate();

  const cart = useSelector<IRootState, CartProps[]>((state) => state.cart.cart);

  const handleQuantityOfProducts = quantityOfProducts(cart);

  const handleTotalPrice = totalPrice(cart);

  const handleCheckOrder = () => {
    navigate("/check-order");
  };

  return (
    <Sheet>
      <SheetTrigger>
        <FaShoppingCart className="text-secondary hover:text-secondary/90 text-2xl" />

        {handleQuantityOfProducts !== 0 && (
          <div className="bg-yellow-500 rounded-full absolute top-[-8px] right-[-12px] min-w-5 min-h-5 flex items-center justify-center">
            <span className="text-xs font-semibold text-neutral-900">
              {handleQuantityOfProducts}
            </span>
          </div>
        )}
      </SheetTrigger>
      <SheetContent className="h-full bg-neutral-800 border-none flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-neutral-50">Seu Carrinho</SheetTitle>
        </SheetHeader>

        <ProductCart />

        <div className="mt-2 flex justify-end items-center gap-4">
          <span className="font-medium">Preço Total:</span>
          <strong className="font-medium">
            {formatCurrency(handleTotalPrice)}
          </strong>
        </div>
        <SheetFooter className="justify-items-center">
          <SheetClose asChild className="w-full">
            <Button
              type="submit"
              variant="destructive"
              disabled={handleQuantityOfProducts === 0}
              onClick={handleCheckOrder}
            >
              Finalizar Compra
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
