import { useSelector } from "react-redux";
import { IRootState } from "../store";
import { CartProps } from "../interfaces/CartProps";

export const useCart = () => {
  const cart = useSelector<IRootState, CartProps[]>((state) => state.cart.cart);

  return cart;
};
