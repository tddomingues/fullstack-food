import { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

//utils
import formatCurrency from "../../utils/formatCurrency";

//hooks

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../store";

//router
import { useNavigate } from "react-router-dom";

//components
import ProductCart from "../../components/ProductCart";
import { Button } from "../../components/ui/button";
import {
  InitialStateProps,
  createAddress,
  getAddress,
  updateAddress,
} from "../../slice/addressSlice";
import { AddressProps } from "../../interfaces/AddressProps";
import Loading from "../../components/Loading";
import { Loader2 } from "lucide-react";

import { totalPrice } from "../../utils/ManipulateCartInfo";

import { IInitialState } from "../../slice/userSlice";
import { CartProps } from "../../interfaces/CartProps";

const CheckOrderInformation = () => {
  const [noAddressError, setNoAddressError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { address, error, loading } = useSelector<
    IRootState,
    InitialStateProps
  >((state) => state.address);

  const { token, user } = useSelector<IRootState, IInitialState>(
    (state) => state.user,
  );

  const cart = useSelector<IRootState, CartProps[]>((state) => state.cart.cart);

  const handleTotalPrice = totalPrice(cart);

  const { register, handleSubmit, reset } = useForm<AddressProps>();

  const onSubmitCreateAddress: SubmitHandler<AddressProps> = (data) => {
    data.userId = user?._id;

    token && dispatch(createAddress({ address: data, token }));
  };

  const onSubmitUpdateAddress: SubmitHandler<AddressProps> = (data) => {
    data.userId = user?._id;

    console.log(data);

    token && dispatch(updateAddress({ address: data, token }));
  };

  const handlePay = () => {
    if (address === null)
      return setNoAddressError("Preencha os campos do endereço.");

    navigate("/");
  };

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    token && dispatch(getAddress(token));
  }, [dispatch, token]);

  if (loading) return <Loading />;

  return (
    <>
      <main className="py-8 min-h-screen flex flex-col">
        <div className="flex justify-between gap-4 flex-1">
          <div>
            <section className="mb-4 bg-neutral-800 p-4 rounded-md ">
              <h2 className="font-semibold text-lg mb-4">Seus Dados</h2>
              <form className="rounded-md ">
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
            <section className="w-[400px] bg-neutral-800 p-4 rounded-md ">
              <h2 className="font-semibold text-lg mb-4">Endereço</h2>
              <form
                className="flex flex-col gap-4  rounded-md"
                onSubmit={
                  address === null
                    ? handleSubmit(onSubmitCreateAddress)
                    : handleSubmit(onSubmitUpdateAddress)
                }
              >
                <label>
                  <span className="block mb-1 text-sm font-medium">
                    Endereço
                  </span>
                  <input
                    type="text"
                    {...register("address")}
                    defaultValue={address?.address}
                    className="p-2 rounded-md text-sm text-neutral-800 w-full"
                    placeholder="Informe seu endereço"
                  />
                </label>
                <label>
                  <span className="block mb-1 text-sm font-medium">Cidade</span>
                  <select
                    {...register("city")}
                    className=" p-2 rounded-md text-sm text-neutral-800"
                  >
                    <option value="0">--Nenhum--</option>
                    <option value="maringá" selected>
                      Maringá
                    </option>
                  </select>
                </label>
                <label>
                  <span className="block mb-1 text-sm font-medium">Estado</span>
                  <select
                    {...register("state")}
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
                    {...register("postalCode")}
                    className="p-2 rounded-md text-sm text-neutral-800 w-full"
                    placeholder="Informe seu CEP"
                    defaultValue={address?.postalCode}
                  />
                </label>

                {error && (
                  <div className="pt-2 px-2 bg-destructive rounded-md">
                    {error.map((err) => (
                      <p className="text-sm font-light text-center text-neutral-50 mb-2">
                        {err}
                      </p>
                    ))}
                  </div>
                )}

                {noAddressError && (
                  <div className="pt-2 px-2 bg-destructive rounded-md">
                    <p className="text-sm font-light text-center text-neutral-50 mb-2">
                      {noAddressError}
                    </p>
                  </div>
                )}

                <div className="flex justify-end mt-4">
                  {address === null ? (
                    <Button variant="destructive" type="submit">
                      Inserir
                    </Button>
                  ) : (
                    <Button
                      variant="destructive"
                      disabled={loading}
                      type="submit"
                    >
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

          <section className="flex-1 bg-neutral-800 p-4 rounded-md max-h-[679px]">
            <div className="overflow-y-auto h-full">
              <h2 className="font-semibold text-lg mb-4">Seu Pedido</h2>
              <div className="rounded-md ">
                <ProductCart />
              </div>
            </div>
          </section>
        </div>
        <div className="mt-4">
          <div className="mb-2 flex justify-end items-center gap-4">
            <span className="font-semibold">Preço Total:</span>
            <strong className="font-medium">
              {formatCurrency(handleTotalPrice)}
            </strong>
          </div>
          <div className="flex justify-between bg-neutral-800 rounded-md p-4">
            <Button variant="secondary" onClick={() => navigate("/")}>
              Voltar
            </Button>
            <Button
              variant="destructive"
              onClick={handlePay}
              disabled={cart.length === 0}
            >
              Pagar
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default CheckOrderInformation;
