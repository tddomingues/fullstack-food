interface CartProps {
  name: string;
  quantity: number;
  subTotalPrice: number;
}

export interface OrderProps {
  _id: string;
  userId: string;
  status: string;
  address: {
    city: string;
    country: string;
    line1: string;
    line2: string | null;
    postal_code: string;
    state: string;
  };
  cart: CartProps[];
}
