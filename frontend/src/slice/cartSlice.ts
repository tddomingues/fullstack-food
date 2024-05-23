import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//interfaces
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
    addQuantityOfProductsInCart: (state, actions: PayloadAction<CartProps>) => {
      const newProduct = state.cart.map((productCart) => {
        const quantity = actions.payload.quantity + 1;
        if (productCart._id === actions.payload._id) {
          return {
            ...productCart,
            quantity,
            subTotalPrice: productCart.price * quantity,
          };
        }
        return productCart;
      });

      localStorage.setItem("cart", JSON.stringify(newProduct));

      state.cart = newProduct;

      return;
    },
    reducerQuantityOfProductsInCart: (
      state,
      actions: PayloadAction<CartProps>,
    ) => {
      const newProduct = state.cart.map((productCart) => {
        if (
          productCart._id === actions.payload._id &&
          actions.payload.quantity > 1
        ) {
          const quantity = actions.payload.quantity - 1;
          return {
            ...productCart,
            quantity,
            subTotalPrice: productCart.price * quantity,
          };
        }
        return productCart;
      });

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
            const quantity = productCart.quantity + 1;
            const subTotalPrice = productCart.price * quantity;

            return {
              ...productCart,
              subTotalPrice,
              quantity,
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

export const {
  addItemToCart,
  addQuantityOfProductsInCart,
  reducerQuantityOfProductsInCart,
  removeItemToCart,
} = cartSlice.actions;

export default cartSlice.reducer;
