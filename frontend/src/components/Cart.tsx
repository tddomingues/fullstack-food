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
import { useCart } from "../hooks/useCart";

//router
import { useNavigate } from "react-router-dom";
import { quantityOfProducts, totalPrice } from "../utils/ManipulateCartInfo";

const Cart = () => {
  const navigate = useNavigate();

  const cart = useCart();

  const { token } = useUserInfo();

  const handleQuantityOfProducts = quantityOfProducts(cart);

  const handleTotalPrice = totalPrice(cart);

  const handleCheckOrderInformation = () => {
    token ? navigate("/check-order-information") : navigate("/login");
  };

  return (
    <Sheet>
      <SheetTrigger>
        <BsCart2 className="text-destructive hover:text-destructive/90 text-2xl" />

        {handleQuantityOfProducts !== 0 && (
          <div className="bg-yellow-500 rounded-full absolute top-[-8px] right-[-8px] min-w-5 min-h-5 flex items-center justify-center">
            <span className="text-xs font-semibold">
              {handleQuantityOfProducts}
            </span>
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
            {formatCurrency(handleTotalPrice)}
          </strong>
        </div>
        <SheetFooter className="">
          <SheetClose asChild className="w-full">
            <Button
              type="submit"
              variant="destructive"
              disabled={handleQuantityOfProducts === 0}
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
