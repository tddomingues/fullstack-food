import { ComponentProps, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Button } from "../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../slice/productSlice";
import { AppDispatch, IRootState } from "../../store";
import ProductCard from "../../components/ProductCard/ProductCard";
import { RootState } from "@reduxjs/toolkit/query";
import { ProductProps } from "../../interfaces/ProductProps";

import BackgroundBurguer from "../../assets/background.jpg";
import { NavLink, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />

      <main className="py-6 px-32 ">
        <section>
          <h1 className="font-semibold text-xl">Faça um pedido</h1>
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
