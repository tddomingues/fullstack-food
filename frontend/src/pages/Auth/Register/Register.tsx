import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../../../components/ui/button";

const Register = () => {
  return (
    <section className="h-svh flex items-center justify-center">
      <div className="p-4 rounded-md shadow-md w-[400px] border">
        <h1 className="text-2xl font-semibold mb-8">Registrar</h1>
        <form className="flex flex-col gap-4">
          <label>
            <span className="block mb-1 text-sm font-medium">Nome</span>
            <input
              type="text"
              name=""
              id=""
              className="p-2 rounded-md text-sm text-neutral-800 w-full"
              placeholder="Informe um nome"
            />
          </label>
          <label>
            <span className="block mb-1 text-sm font-medium">Email</span>
            <input
              type="email"
              name=""
              id=""
              className="p-2 rounded-md text-sm text-neutral-800 w-full"
              placeholder="Informe um e-mail"
            />
          </label>
          <label>
            <span className="block mb-1 text-sm font-medium">Senha</span>
            <input
              type="password"
              name=""
              id=""
              className="p-2 rounded-md text-sm text-neutral-800 w-full"
              placeholder="Informe uma senha"
            />
          </label>
          <label>
            <span className="block mb-1 text-sm font-medium">
              Confirmar Senha
            </span>
            <input
              type="password"
              name=""
              id=""
              className="p-2 rounded-md text-sm text-neutral-800 w-full"
              placeholder="Confirme a senha"
            />
          </label>
          <span className="flex justify-between text-sm font-light">
            <p>Você possui registro?</p>
            <NavLink to="/login">Entrar</NavLink>
          </span>
          <Button variant="destructive">Registrar</Button>
        </form>
      </div>
    </section>
  );
};

export default Register;
