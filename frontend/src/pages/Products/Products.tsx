//router
import { NavLink, Outlet, useNavigate } from "react-router-dom";

//components
import { Button } from "../../components/ui/button";
import Navbar from "../../components/Navbar";

//styles
import IconBurguer from "../../assets/icon-burguer.png";
import IconCombo from "../../assets/icon-combo.png";
import IconDrink from "../../assets/icon-drink.png";

//redux
import { IRootState } from "../../store";
import { useSelector } from "react-redux";

//interfaces
import { UserProps } from "../../interfaces/UserProps";
import { Toaster } from "../../components/ui/toaster";
import Footer from "../../components/Footer";

type User = Omit<UserProps, "_id" | "password">;

const Home = () => {
  const navigate = useNavigate();

  const user = useSelector<IRootState, User | undefined>(
    (state) => state.user.user,
  );

  return (
    <>
      <Navbar />
      <main className="py-0 flex-1">
        <div>
          {user?.role === "admin" && (
            <div className="flex justify-end items-center mb-4">
              <Button
                onClick={() => navigate("admin-painel/create-product")}
                variant="secondary"
              >
                Criar Produto
              </Button>
            </div>
          )}

          <div className="flex gap-4">
            <aside className="w-[240px]">
              <h2 className="bg-neutral-800 mb-4 rounded-md p-4 text-2xl font-medium">
                Categorias
              </h2>
              <div>
                <ul className="flex justify-center flex-col w-full">
                  <li>
                    <NavLink
                      to="/"
                      className="flex items-center justify-between gap-2 rounded-t-md p-4 text-center cursor-pointer transition ease-in-out delay-100 bg-neutral-800 hover:bg-neutral-700"
                    >
                      <span className="font-normal text-base">Todos</span>

                      <img
                        src={IconCombo}
                        alt="Icone de um hamburguer"
                        className="h-[50px]"
                      />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/category/burguer"
                      className="flex items-center justify-between gap-2 p-4 text-center cursor-pointer transition ease-in-out delay-100 bg-neutral-800  hover:bg-neutral-700"
                    >
                      <span className="font-normal text-base">
                        Hambúrgueres
                      </span>

                      <img
                        src={IconBurguer}
                        alt="Icone de um hamburguer"
                        className="h-[50px]"
                      />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/category/drink"
                      className="flex items-center justify-between gap-2 rounded-b-md p-4 text-center cursor-pointer transition ease-in-out delay-100 bg-neutral-800  hover:bg-neutral-700"
                    >
                      <span className="font-normal text-base">Bebidas</span>

                      <img
                        src={IconDrink}
                        alt="Icone de um hamburguer"
                        className="h-[50px]"
                      />
                    </NavLink>
                  </li>
                </ul>
              </div>
            </aside>

            <section className="flex-1">
              <h2 className="bg-neutral-800 mb-4 rounded-md p-4 text-2xl font-medium">
                Produtos
              </h2>
              <div className="flex-1">
                <div className="rounded-md ">
                  <Outlet />
                </div>
              </div>
            </section>
          </div>
        </div>
        <Toaster />
      </main>
      <Footer />
    </>
  );
};

export default Home;
