import { useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../../store";

import { CartProps } from "../../../interfaces/CartProps";
import { cleanCart } from "../../../slice/cartSlice";

const SuccessfulPayment = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector<IRootState, CartProps[]>((state) => state.cart.cart);

  console.log(cart);

  useEffect(() => {
    dispatch(cleanCart());
  }, [dispatch]);

  return (
    <section className="place-items-center grid w-full h-svh">
      <div className="rounded-md bg-neutral-800 p-4 flex flex-col">
        <h2 className="text-2xl font-medium mb-4">Parabéns pela compra!</h2>
        <Button onClick={() => navigate("/")} variant="secondary">
          Início
        </Button>
      </div>
    </section>
  );
};

export default SuccessfulPayment;
