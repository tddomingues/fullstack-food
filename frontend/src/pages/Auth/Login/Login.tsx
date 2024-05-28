import { useEffect } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

//router
import { NavLink } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../../store";
import { login, reset } from "../../../slice/userSlice";

//components
import { Button } from "../../../components/ui/button";

interface LoginUserProps {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();

  const error = useSelector<IRootState, string[] | null>(
    (state) => state.user.error,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserProps>();

  const onSubmit: SubmitHandler<LoginUserProps> = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <section className="p-4 rounded-md w-[400px] bg-neutral-800">
      <h1 className="text-2xl font-medium mb-8 text-center">Entrar</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span className="block mb-1 text-sm font-medium">Email</span>
          <input
            type="email"
            {...register("email", { required: true })}
            className="p-2 rounded-md text-sm text-neutral-900 w-full"
            placeholder="Informe seu e-mail"
          />
          {errors.email?.type === "required" && (
            <div className="p-2 bg-destructive rounded-md mt-2">
              <p className="text-sm font-light text-center text-neutral-50">
                O e-mail é obrigatório.
              </p>
            </div>
          )}
        </label>
        <label>
          <span className="block mb-1 text-sm font-medium">Senha</span>
          <input
            type="password"
            {...register("password", { required: true })}
            className="p-2 rounded-md text-sm text-neutral-800 w-full"
            placeholder="Informe sua senha"
          />
          {errors.password?.type === "required" && (
            <div className="p-2 bg-destructive rounded-md mt-2">
              <p className="text-sm font-light text-center text-neutral-50">
                A senha é obrigatória.
              </p>
            </div>
          )}
        </label>
        {error && (
          <div className="p-2 bg-destructive rounded-md mt-[-8px]">
            {error.map((err) => (
              <p className="text-sm font-light text-center text-neutral-50">
                {err}
              </p>
            ))}
          </div>
        )}

        <span className="flex justify-between text-sm font-light text-neutral-300">
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
