import { ProductProps } from "./ProductProps";

export interface CartProps extends ProductProps {
  quantity: number;
  subTotalPrice: number;
}
