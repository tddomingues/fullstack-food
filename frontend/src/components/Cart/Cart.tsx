import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";

import { FaCartShopping } from "react-icons/fa6";

import BurgerImage from "../../assets/burguer.png";

import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { CartProps } from "../../interfaces/CartProps";
import formatCurrency from "../../utils/formatCurrency";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../store";
import { addQuantity, removeItemToCart } from "../../slice/cartSlice";
import { Button } from "../ui/button";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector<IRootState, CartProps[]>((state) => state.cart.cart);

  const handleQuantity = (product: CartProps, operation: string) => {
    if (operation === "sum" && product.quantity) {
      dispatch(addQuantity({ product, quantity: product.quantity + 1 }));
    } else if (operation === "subtraction" && product.quantity) {
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

  const totalPrice = cart.reduce((previous, current) => {
    return previous + current.subTotalPrice;
  }, 0);

  const quantityOfProducts = cart.reduce((previous, current) => {
    return previous + current.quantity;
  }, 0);

  console.log("x: ", quantityOfProducts);

  return (
    <Sheet>
      <SheetTrigger>
        <FaCartShopping
          className="text-destructive hover:text-destructive/90"
          size={20}
        />

        {quantityOfProducts !== 0 && (
          <div className="bg-yellow-500/80 rounded-full  absolute top-[-16px] right-[-10px] min-w-6 min-h-6 flex items-center justify-center">
            <span className="text-xs font-semibold">{quantityOfProducts}</span>
          </div>
        )}
      </SheetTrigger>
      <SheetContent className="h-full ">
        <SheetHeader>
          <SheetTitle>Seu Carrinho</SheetTitle>
        </SheetHeader>
        <div className="h-5/6 overflow-y-auto pt-3 mt-1 border-t">
          <div className="flex flex-col gap-3 ">
            {quantityOfProducts === 0 && <p className="font-semibold">Vazio</p>}
            {cart &&
              cart.map((productCart) => (
                <div className="flex justify-between items-center">
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

                  <div className="border border-neutral-400 rounded-md flex items-center justify-between gap-6 p-1 min-w-[80px] mr-2">
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
                        onClick={() =>
                          handleQuantity(productCart, "subtraction")
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
        <div className="mb-2 border-t pt-1 flex justify-between items-center">
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
