import Navbar from "../../components/Navbar/Navbar";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <main className="py-5 px-32 ">
        <section className="flex justify-between gap-4">
          <div>
            <div className="rounded-md border-[1px] border-neutral-200 bg-neutral-100">
              <input
                type="text"
                name=""
                id=""
                placeholder="Pesquisar"
                className="p-2 text-neutral-800"
              />
            </div>
            <div className="mt-12 bg-neutral-100 rounded-md border-[1px] border-neutral-200 p-2">
              <h3 className="mb-6 text-xl font-semibold">Categorias</h3>
              <ul className="flex flex-col gap-4">
                <li className="cursor-pointer">Todos</li>
                <li className="cursor-pointer">Hamburgueres</li>
                <li className="cursor-pointer">Pizzas</li>
                <li className="cursor-pointer">Bebidas</li>
              </ul>
            </div>
          </div>
          <div className="flex-1">
            <div
              className="bg-neutral-100 rounded-md border-[1px] border-neutral-200 p-2 mb-8 flex justify-end"
              onClick={() => navigate("/create-products")}
            >
              <Button>Criar Produto</Button>
            </div>
            <div className="bg-neutral-100 rounded-md border-[1px] border-neutral-200 p-2 ">
              lista de produtos
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AdminPanel;
