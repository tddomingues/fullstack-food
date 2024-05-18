import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductProps } from "../interfaces/ProductProps";
import { CartProps } from "../interfaces/CartProps";

interface IInitialState {
  cart: CartProps[];
}

const cartLocalStorage: CartProps[] = JSON.parse(
  localStorage.getItem("cart") || "[]",
);

const initialState: IInitialState = {
  cart: cartLocalStorage ? cartLocalStorage : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addQuantity: (
      state,
      actions: PayloadAction<{ product: ProductProps; quantity: number }>,
    ) => {
      const newProduct = state.cart.map((productCart) => {
        if (productCart._id === actions.payload.product._id) {
          return {
            ...productCart,
            quantity: actions.payload.quantity,
            subTotalPrice: productCart.price * actions.payload.quantity,
          };
        }
        return productCart;
      });

      console.log("quantide> ", actions.payload.quantity);

      localStorage.setItem("cart", JSON.stringify(newProduct));

      state.cart = newProduct;

      return;
    },
    addItemToCart: (state, action: PayloadAction<ProductProps>) => {
      const productExists = state.cart.find((productsCart) => {
        return productsCart._id === action.payload._id;
      });

      if (productExists) {
        const newCart = state.cart.map((productCart) => {
          if (productCart._id === action.payload._id) {
            const subTotalPrice = productCart.price * productCart.quantity;

            return {
              ...productCart,
              subTotalPrice,
              quantity: productCart.quantity,
            };
          }

          return productCart;
        });

        localStorage.setItem("cart", JSON.stringify(newCart));

        state.cart = newCart;

        return;
      }

      const newProductAdded: CartProps = {
        ...action.payload,
        quantity: 1,
        subTotalPrice: action.payload.price,
      };

      localStorage.setItem(
        "cart",
        JSON.stringify([...state.cart, newProductAdded]),
      );

      state.cart = [...state.cart, newProductAdded];

      return;
    },
    removeItemToCart: (state, action: PayloadAction<CartProps>) => {
      const newCart = state.cart.filter((productCart) => {
        return productCart._id !== action.payload._id;
      });

      localStorage.setItem("cart", JSON.stringify(newCart));

      state.cart = newCart;
    },
  },
});

export const { addItemToCart, addQuantity, removeItemToCart } =
  cartSlice.actions;

export default cartSlice.reducer;
