import { NavLink, Navigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../../store";
import { FormEvent, useEffect, useRef } from "react";
import { register } from "../../../slice/userSlice";

const Register = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  const error = useSelector<IRootState, string[] | null>(
    (state) => state.user.error,
  );

  const success = useSelector<IRootState, boolean>(
    (state) => state.user.success,
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data = {
      name: nameRef.current?.value || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      confirmPassword: confirmPasswordRef.current?.value || "",
    };

    dispatch(register(data));
  };

  if (success) return <Navigate to="/login" />;

  return (
    <section className="p-4 rounded-md shadow-md w-[400px] border">
      <h1 className="text-2xl font-semibold mb-8">Registrar</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label>
          <span className="block mb-1 text-sm font-medium">Nome</span>
          <input
            type="text"
            name=""
            id=""
            ref={nameRef}
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
            ref={emailRef}
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
            ref={passwordRef}
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
            ref={confirmPasswordRef}
            className="p-2 rounded-md text-sm text-neutral-800 w-full"
            placeholder="Confirme a senha"
          />
        </label>
        {error && (
          <div className="pt-2 px-2 bg-destructive rounded-md">
            {error &&
              error.map((err) => (
                <p className="text-sm font-light text-center text-neutral-50 mb-2">
                  {err}
                </p>
              ))}
          </div>
        )}
        <span className="flex justify-between text-sm font-light">
          <p>Você possui registro?</p>
          <NavLink to="/login">Entrar</NavLink>
        </span>
        <Button variant="destructive" type="submit">
          Registrar
        </Button>
      </form>
    </section>
  );
};

export default Register;
