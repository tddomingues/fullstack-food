import { FormEvent, useRef } from "react";

//router
import { NavLink } from "react-router-dom";

//redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { login } from "../../../slice/userSlice";

//components
import { Button } from "../../../components/ui/button";
import { useUserInfo } from "../../../hooks/useUserInfo";

const Login = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const { error } = useUserInfo();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email === null || password === null) return;

    const user = {
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    };

    dispatch(login(user));
  };

  return (
    <section className="p-4 rounded-md shadow-md w-[400px] border">
      <h1 className="text-2xl font-semibold mb-8">Entrar</h1>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <label>
          <span className="block mb-1 text-sm font-medium">Email</span>
          <input
            type="email"
            name=""
            id=""
            className="p-2 rounded-md text-sm text-neutral-800 w-full"
            placeholder="Informe seu e-mail"
            ref={emailRef}
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
            ref={passwordRef}
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
          <p>Você não possui registro?</p>
          <NavLink to="/register">Registrar</NavLink>
        </span>
        <Button variant="destructive" type="submit">
          Entrar
        </Button>
      </form>
    </section>
  );
};

export default Login;
