import Navbar from "../../components/Navbar";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <main className="py-6 px-32 ">
        <section>
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-xl">Faça um pedido</h1>
            <Button
              onClick={() => navigate("admin-painel/create-product")}
              variant="outline"
            >
              Criar Produto
            </Button>
          </div>

          <div className="flex justify-between gap-4 mt-4">
            <div>
              <div className="rounded-md border-[1px] border-neutral-400 bg-neutral-100">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Pesquisar"
                  className="p-2 text-neutral-800"
                />
              </div>
              <div className="mt-12 bg-neutral-100 rounded-md border-[1px] border-neutral-400 p-2">
                <h3 className="mb-6 text-xl font-semibold">Categorias</h3>
                <ul className="flex flex-col gap-4">
                  <li className="cursor-pointer">
                    <NavLink to="/">Todos</NavLink>
                  </li>
                  <li className="cursor-pointer">
                    <NavLink to="/category/burguer">Hamburgueres</NavLink>
                  </li>
                  <li className="cursor-pointer">
                    <NavLink to="/category/pizza">Pizzas</NavLink>
                  </li>
                  <li className="cursor-pointer">
                    <NavLink to="/category/drink">Bebidas</NavLink>
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
