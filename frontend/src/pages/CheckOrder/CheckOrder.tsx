//utils
import formatCurrency from "../../utils/formatCurrency";
import { quantityOfProducts, totalPrice } from "../../utils/ManipulateCartInfo";

//router
import { useNavigate } from "react-router-dom";

//components
import { Button } from "../../components/ui/button";

//redux
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import { IInitialState } from "../../slice/userSlice";
import { orderService } from "../../service/orderService";

//interface
import { CartProps } from "../../interfaces/CartProps";

const CheckOrder = () => {
  const navigate = useNavigate();

  const { user } = useSelector<IRootState, IInitialState>(
    (state) => state.user,
  );

  const cart = useSelector<IRootState, CartProps[]>((state) => state.cart.cart);

  const handleTotalPrice = totalPrice(cart);

  const handleQuantityOfProducts = quantityOfProducts(cart);

  const handlePay = () => {
    if (user?._id) {
      orderService.payment({ cart, userId: user._id });
    }
  };

  return (
    <>
      <div className="mt-4">
        <Button variant="secondary" onClick={() => navigate("/")}>
          Voltar
        </Button>
      </div>
      <main className="py-4 flex justify-between gap-4">
        <section className="flex-1">
          <article className="mb-4 bg-neutral-800 p-4 rounded-md ">
            <h2 className="font-semibold text-lg mb-4">Seus Dados</h2>
            <form className="rounded-md ">
              <label>
                <span className="block mb-1 text-sm font-medium ">Nome</span>
                <input
                  type="text"
                  name=""
                  id=""
                  className="p-2 rounded-md text-sm text-neutral-900 w-full "
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
          </article>
          <article className="bg-neutral-800 p-4 rounded-md ">
            <h2 className="font-semibold text-lg mb-4">Seu Pedido</h2>
            <div className="rounded-md ">
              <div className="overflow-y-auto flex-1">
                <div className="flex flex-col gap-4">
                  {handleQuantityOfProducts === 0 && (
                    <p className="font-semibold">Vazio</p>
                  )}
                  {cart &&
                    cart.map((productCart) => (
                      <div
                        className="flex justify-between items-center bg-neutral-900 rounded-md p-2"
                        key={productCart._id}
                      >
                        <div className="flex gap-2 items-center">
                          <div className="w-[70px] h-[70px] ">
                            <img
                              src={`http://localhost:3000/uploads/${productCart.imageUrl}`}
                              alt={productCart.description}
                              className="object-contain w-full h-full rounded-md "
                            />
                          </div>
                          <div>
                            <h4 className="font-normal text-sm text-neutral-300">
                              {productCart.name}
                            </h4>
                            <span className="text-sm">
                              Quantidade: {productCart.quantity}
                            </span>
                          </div>
                        </div>

                        <div className="mr-2">
                          <span className="text-sm">
                            {formatCurrency(Number(productCart.subTotalPrice))}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </article>
        </section>
        <aside className="relative w-[200px]">
          <div className="fixed bg-neutral-800 rounded-md w-[200px]  p-4 flex flex-col justify-between">
            <div className="flex justify-end gap-4">
              <span className="font-semibold">Preço Total:</span>
              <strong className="font-medium">
                {formatCurrency(handleTotalPrice)}
              </strong>
            </div>
            <div className="flex justify-between rounded-md gap-4 mt-4">
              <Button
                variant="destructive"
                className="w-full"
                onClick={handlePay}
                disabled={cart.length === 0 && user === undefined}
              >
                Meio de Pagamento
              </Button>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
};

export default CheckOrder;
