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
import { BsCart2 } from "react-icons/bs";

//utils
import formatCurrency from "../utils/formatCurrency";

//hooks
import { useUserInfo } from "../hooks/useUserInfo";

//interfaces
import { CartProps } from "../interfaces/CartProps";

//redux
import { useSelector } from "react-redux";
import { IRootState } from "../store";

//router
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const cart = useSelector<IRootState, CartProps[]>((state) => state.cart.cart);

  const { token } = useUserInfo();

  const quantityOfProducts = cart.reduce((previous, current) => {
    return previous + current.quantity;
  }, 0);

  const totalPrice = cart.reduce((previous, current) => {
    return previous + current.subTotalPrice;
  }, 0);

  const handleCheckOrderInformation = () => {
    if (token) {
      navigate("/check-order-information");
    } else {
      navigate("/login");
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <BsCart2 className="text-destructive hover:text-destructive/90 text-3xl" />

        {quantityOfProducts !== 0 && (
          <div className="bg-yellow-500 rounded-full absolute top-[-6px] right-[-6px] min-w-5 min-h-5 flex items-center justify-center">
            <span className="text-xs font-semibold">{quantityOfProducts}</span>
          </div>
        )}
      </SheetTrigger>
      <SheetContent className="h-full ">
        <SheetHeader>
          <SheetTitle>Seu Carrinho</SheetTitle>
        </SheetHeader>
        <ProductCart />
        <div className="mb-2 mt-2 flex justify-end items-center gap-4">
          <span className="font-semibold">Preço Total:</span>
          <strong className="font-semibold">
            {formatCurrency(Number(totalPrice))}
          </strong>
        </div>
        <SheetFooter className="">
          <SheetClose asChild className="w-full">
            <Button
              type="submit"
              variant="destructive"
              disabled={quantityOfProducts === 0}
              onClick={handleCheckOrderInformation}
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
