import { useEffect } from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../store";
import { FaRegCircleCheck } from "react-icons/fa6";
import { CartProps } from "../../interfaces/CartProps";
import { cleanCart } from "../../slice/cartSlice";

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
      <div className="flex flex-col gap-3 text-neutral-50 text-center">
        <span className="m-auto ">
          <FaRegCircleCheck size={40} />
        </span>
        <h2 className="text-2xl font-medium">Parabéns pela compra!</h2>
        <p>Seu pagamento foi feito com sucesso.</p>
        <Button
          onClick={() => navigate("/")}
          variant="secondary"
          className="mt-4"
        >
          Finalizar
        </Button>
      </div>
    </section>
  );
};

export default SuccessfulPayment;
