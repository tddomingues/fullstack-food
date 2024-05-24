//router
import { Outlet, useNavigate } from "react-router-dom";

//components
import { Button } from "../../components/ui/button";
import Navbar from "../../components/Navbar";

//hooks
import { useUserInfo } from "../../hooks/useUserInfo";

const Home = () => {
  const navigate = useNavigate();

  const { user } = useUserInfo();

  return (
    <>
      <Navbar />

      <main className="py-6 px-32 ">
        <section>
          {user && user.role === "admin" && (
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-xl">
                Itens vendidos pela loja
              </h1>
              <Button
                onClick={() => navigate("admin-painel/create-product")}
                variant="outline"
              >
                Criar Produto
              </Button>
            </div>
          )}

          {user && user.role === "client" && (
            <h1 className="font-semibold text-xl">Faça o seu pedido</h1>
          )}

          <div className="flex justify-between gap-4 mt-4">
            <div>
              <div className="rounded-md border-[1px] border-neutral-400 bg-neutral-100">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Pesquisar"
                  className="p-2 text-neutral-800 border"
                />
              </div>
              <div className="mt-12 bg-neutral-100 rounded-md border-[1px] border-neutral-400">
                <h3 className="mb-6 text-xl font-semibold p-2">Categorias</h3>
                <ul className="flex flex-col">
                  <li
                    className="cursor-pointer p-2 w-full transition ease-in-out delay-100 hover:bg-neutral-200"
                    onClick={() => navigate("/")}
                  >
                    <span>Todos</span>
                  </li>
                  <li
                    className="cursor-pointer p-2 w-full transition ease-in-out delay-100 hover:bg-neutral-200"
                    onClick={() => navigate("category/burguer")}
                  >
                    <span>Hamburgueres</span>
                  </li>
                  <li
                    className="cursor-pointer p-2 w-full transition ease-in-out delay-100 hover:bg-neutral-200"
                    onClick={() => navigate("category/pizza")}
                  >
                    <span>Pizzas</span>
                  </li>
                  <li
                    className="cursor-pointer p-2 w-full transition ease-in-out delay-100 rounded-b-md hover:bg-neutral-200"
                    onClick={() => navigate("category/drink")}
                  >
                    <span>Bebidas</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex-1">
              <div className="rounded-md  ">
                <Outlet />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
