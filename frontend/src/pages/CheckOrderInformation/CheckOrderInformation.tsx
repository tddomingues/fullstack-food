import { FormEvent, useEffect, useRef } from "react";

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
import {
  createAddress,
  getAddress,
  updateAddress,
} from "../../slice/addressSlice";
import { AddressProps } from "../../interfaces/AddressProps";
import Loading from "../../components/Loading";
import { Loader2 } from "lucide-react";

const CheckOrderInformation = () => {
  const addressRef = useRef<HTMLInputElement | null>(null);
  const cityRef = useRef<HTMLSelectElement | null>(null);
  const stateRef = useRef<HTMLSelectElement | null>(null);
  const postalCodeRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const address = useSelector<IRootState, AddressProps | null>(
    (state) => state.address.address,
  );

  const error = useSelector<IRootState, string[] | null>(
    (state) => state.address.error,
  );

  console.log(error);

  const loading = useSelector<IRootState, boolean>(
    (state) => state.address.loading,
  );

  const cart = useSelector<IRootState, CartProps[]>((state) => state.cart.cart);

  const { token, user } = useUserInfo();

  console.log(address);

  const totalPrice = cart.reduce((previous, current) => {
    return previous + current.subTotalPrice;
  }, 0);

  const handleCreateAddress = (e: FormEvent) => {
    e.preventDefault();

    const address: AddressProps = {
      address: addressRef.current?.value,
      city: cityRef.current?.value,
      state: stateRef.current?.value,
      postalCode: postalCodeRef.current?.value,
      userId: user?._id,
    };

    dispatch(createAddress({ address, token: token || "" }));
  };

  const handleUpdateAddress = (e: FormEvent) => {
    e.preventDefault();

    const address: AddressProps = {
      address: addressRef.current?.value,
      city: cityRef.current?.value,
      state: stateRef.current?.value,
      postalCode: postalCodeRef.current?.value,
      userId: user?._id,
    };

    dispatch(updateAddress({ address, token: token || "" }));
  };

  useEffect(() => {
    dispatch(getAddress(token || ""));
  }, [dispatch, token]);

  if (loading) return <Loading />;

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
              </form>
            </section>
            <section className="w-[400px]">
              <h2 className="font-semibold text-lg mb-1">Endereço</h2>
              <form
                className="flex flex-col gap-4 p-2 rounded-md border border-neutral-400 "
                onSubmit={
                  address === null ? handleCreateAddress : handleUpdateAddress
                }
              >
                <label>
                  <span className="block mb-1 text-sm font-medium">
                    Endereço
                  </span>
                  <input
                    type="text"
                    name=""
                    id=""
                    defaultValue={address?.address}
                    className="p-2 rounded-md text-sm text-neutral-800 w-full"
                    placeholder="Informe seu e-mail"
                    ref={addressRef}
                  />
                </label>
                <label>
                  <span className="block mb-1 text-sm font-medium">Cidade</span>
                  <select
                    ref={cityRef}
                    className=" p-2 rounded-md text-sm text-neutral-800"
                  >
                    <option value="">--Nenhum--</option>
                    <option value="maringá" selected>
                      Maringá
                    </option>
                  </select>
                </label>
                <label>
                  <span className="block mb-1 text-sm font-medium">Estado</span>
                  <select
                    ref={stateRef}
                    className=" p-2 rounded-md text-sm text-neutral-800"
                  >
                    <option value="">--Nenhum--</option>
                    <option value="paraná" selected>
                      Paraná
                    </option>
                  </select>
                </label>
                <label>
                  <span className="block mb-1 text-sm font-medium">CEP</span>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="p-2 rounded-md text-sm text-neutral-800 w-full"
                    placeholder="Informe sua senha"
                    ref={postalCodeRef}
                    defaultValue={address?.postalCode}
                  />
                </label>

                {error && (
                  <div className="pt-2 px-2 bg-destructive rounded-md">
                    {error &&
                      error.map((err) => (
                        <p className="text-sm font-light text-center text-neutral-50 mb-2">
                          {err}
                        </p>
                      ))}
                  </div>
                )}

                <div className="flex justify-end mt-4">
                  {address === null ? (
                    <Button variant="destructive" onClick={handleCreateAddress}>
                      Inserir
                    </Button>
                  ) : (
                    <Button variant="destructive" disabled={loading}>
                      Atualizar
                      {loading && (
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      )}
                    </Button>
                  )}
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
