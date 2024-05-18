import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../../../components/ui/button";

const Login = () => {
  return (
    <section className="h-svh flex items-center justify-center">
      <div className="p-4 rounded-md shadow-md w-[400px] border">
        <h1 className="text-2xl font-semibold mb-8">Entrar</h1>
        <form className="flex flex-col gap-4">
          <label>
            <span className="block mb-1 text-sm font-medium">Email</span>
            <input
              type="email"
              name=""
              id=""
              className="p-2 rounded-md text-sm text-neutral-800 w-full"
              placeholder="Informe seu e-mail"
            />
          </label>
          <label>
            <span className="block mb-1 text-sm font-medium">Senha</span>
            <input
              type="password"
              name=""
              id=""
              className="p-2 rounded-md text-sm text-neutral-800 w-full"
              placeholder="Informe sua senha"
            />
          </label>
          <span className="flex justify-between text-sm font-light">
            <p>Você não possui registro?</p>
            <NavLink to="/register">Registrar</NavLink>
          </span>
          <Button variant="destructive">Entrar</Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
