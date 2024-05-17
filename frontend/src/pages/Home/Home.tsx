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
import { NavLink } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const products: ProductProps[] = useSelector<IRootState, ProductProps[]>(
    (state) => state.product.products,
  );

  console.log(products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <main className="px-32 py-8">
        <ProductCard products={products} />
        <div className="mt-16 flex justify-center bg-red-400 relative h-[400px] rounded-md ">
          <div className="absolute bg-neutral-900 py-4 px-8 top-[-20px] cursor-pointer z-30 ">
            <span className="text-neutral-50 text-xl">
              <NavLink to="/menu" className="">
                Menu
              </NavLink>
            </span>
          </div>
          <img
            src={BackgroundBurguer}
            alt=""
            className="w-full object-cover object-center rounded-md "
          />
          <div className="absolute w-full h-full bg-gradient-to-t from-neutral-900/60 to-neutral-900/40 rounded-md"></div>
        </div>
      </main>
    </>
  );
};

export default Home;
