import { CartProps } from "../interfaces/CartProps";

export const quantityOfProducts = (cart: CartProps[]) => {
  return cart.reduce((previous, current) => {
    return previous + current.quantity;
  }, 0);
};

export const totalPrice = (cart: CartProps[]) => {
  return cart.reduce((previous, current) => {
    return previous + current.subTotalPrice;
  }, 0);
};
