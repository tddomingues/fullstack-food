import { useEffect } from "react";

//utils
import formatCurrency from "../../utils/formatCurrency";

//interface
import { CartProps } from "../../interfaces/CartProps";

//hooks
import { useUserInfo } from "../../hooks/useUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../store";

//router
import { useNavigate } from "react-router-dom";

//redux
import { getUser } from "../../slice/userSlice";

//components
import ProductCart from "../../components/ProductCart";
import { Button } from "../../components/ui/button";

const CheckOrderInformation = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const cart = useSelector<IRootState, CartProps[]>((state) => state.cart.cart);

  const { token, user } = useUserInfo();

  const totalPrice = cart.reduce((previous, current) => {
    return previous + current.subTotalPrice;
  }, 0);

  useEffect(() => {
    dispatch(getUser(token || ""));
  }, [dispatch, token]);

  return (
    <>
      <main className="px-32 py-6 min-h-screen flex flex-col">
        <div className="flex justify-between gap-4 flex-1">
          <div>
            <section className="mb-4">
              <h2 className="font-semibold text-lg mb-1">Seus Dados</h2>
              <form className="p-2 rounded-md border border-neutral-400 ">
                <label>
                  <span className="block mb-1 text-sm font-medium">Nome</span>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="p-2 rounded-md text-sm text-neutral-800 w-full"
                    value={user?.name || ""}
                    disabled
                  />
                </label>
                <label>
                  <span className="block mb-1 mt-4 text-sm font-medium">
                    Email
                  </span>
                  <input
                    type="email"
                    name=""
                    id=""
                    value={user?.email || ""}
                    className="p-2 rounded-md text-sm text-neutral-800 w-full"
                    disabled
                  />
                </label>

                <div className="flex justify-end mt-4">
                  <Button variant="outline">Editar</Button>
                </div>
              </form>
            </section>
            <section>
              <h2 className="font-semibold text-lg mb-1">Verificar Endereço</h2>
              <form className="p-2 rounded-md border border-neutral-400 ">
                <div className="flex items-center gap-4 mb-4">
                  <label>
                    <span className="block mb-1 text-sm font-medium">
                      Bairro
                    </span>
                    <input
                      type="text"
                      name=""
                      id=""
                      className="p-2 rounded-md text-sm text-neutral-800 w-full"
                      disabled
                    />
                  </label>
                  <label>
                    <span className="block mb-1 text-sm font-medium">Rua</span>
                    <input
                      type="text"
                      name=""
                      id=""
                      className="p-2 rounded-md text-sm text-neutral-800 w-full"
                      disabled
                    />
                  </label>
                </div>
                <div className="flex items-center gap-4">
                  <label>
                    <span className="block mb-1 text-sm font-medium">
                      Número
                    </span>
                    <input
                      type="text"
                      name=""
                      id=""
                      className="p-2 rounded-md text-sm text-neutral-800 w-full"
                      disabled
                    />
                  </label>
                  <label>
                    <span className="block mb-1 text-sm font-medium">CEP</span>
                    <input
                      type="text"
                      name=""
                      id=""
                      className="p-2 rounded-md text-sm text-neutral-800 w-full"
                      disabled
                    />
                  </label>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline">Editar</Button>
                </div>
              </form>
            </section>
          </div>

          <section className="flex-1">
            <h2 className="font-semibold text-lg mb-1">Seu Pedido</h2>
            <div className="rounded-md border border-neutral-400 px-2">
              <ProductCart />
            </div>
          </section>
        </div>
        <div className="mt-4">
          <div className="mb-2 flex justify-end items-center gap-4">
            <span className="font-semibold">Preço Total:</span>
            <strong className="font-semibold">
              {formatCurrency(Number(totalPrice))}
            </strong>
          </div>
          <div className="flex justify-between bg-neutral-100 rounded-md p-2">
            <Button variant="outline" onClick={() => navigate("/")}>
              Voltar
            </Button>
            <Button variant="destructive">Pagar</Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default CheckOrderInformation;
