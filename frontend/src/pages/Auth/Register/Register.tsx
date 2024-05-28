import { useForm, SubmitHandler } from "react-hook-form";

//hooks

//router
import { NavLink, Navigate } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../../store";
import { register, reset } from "../../../slice/userSlice";

//components
import { Button } from "../../../components/ui/button";
import { useEffect } from "react";

interface RegisterUserProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();

  const error = useSelector<IRootState, string[] | null>(
    (state) => state.user.error,
  );

  const success = useSelector<IRootState, boolean | null>(
    (state) => state.user.success,
  );

  const {
    register: register_form,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserProps>();

  const onSubmit: SubmitHandler<RegisterUserProps> = (data) => {
    dispatch(register(data));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  if (success) return <Navigate to="/login" />;

  return (
    <section className="p-4 rounded-md w-[400px] bg-neutral-800">
      <h1 className="text-2xl font-medium mb-8 text-center">Registrar</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span className="block mb-1 text-sm font-medium">Nome</span>
          <input
            type="text"
            {...register_form("name", { required: true })}
            className="p-2 rounded-md text-sm text-neutral-900 w-full"
            placeholder="Informe um nome"
          />
          {errors.name?.type === "required" && (
            <div className="p-2 bg-destructive rounded-md mt-2">
              <p className="text-sm font-light text-center text-neutral-50">
                O nome é obrigatório.
              </p>
            </div>
          )}
        </label>
        <label>
          <span className="block mb-1 text-sm font-medium">Email</span>
          <input
            type="email"
            {...register_form("email", { required: true })}
            className="p-2 rounded-md text-sm text-neutral-900 w-full"
            placeholder="Informe um e-mail"
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
            {...register_form("password", { required: true })}
            className="p-2 rounded-md text-sm text-neutral-800 w-full"
            placeholder="Informe uma senha"
          />
          {errors.password?.type === "required" && (
            <div className="p-2 bg-destructive rounded-md mt-2">
              <p className="text-sm font-light text-center text-neutral-50">
                A senha é obrigatória.
              </p>
            </div>
          )}
        </label>
        <label>
          <span className="block mb-1 text-sm font-medium">
            Confirmar Senha
          </span>
          <input
            type="password"
            {...register_form("confirmPassword", { required: true })}
            className="p-2 rounded-md text-sm text-neutral-800 w-full"
            placeholder="Confirme a senha"
          />
          {errors.confirmPassword?.type === "required" && (
            <div className="p-2 bg-destructive rounded-md mt-2">
              <p className="text-sm font-light text-center text-neutral-50">
                A confirmação da senha é obrigatória.
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
