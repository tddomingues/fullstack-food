import { ReactNode, useEffect } from "react";

//router
import { useNavigate } from "react-router-dom";

//hooks
import { useSelector } from "react-redux";
import { IRootState } from "../store";

//intefaces
import { UserProps } from "../interfaces/UserProps";

type User = Omit<UserProps, "_id" | "password">;

//proteger rota logado
const ProtectLoggedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const user = useSelector<IRootState, User | undefined>(
    (state) => state.user.user,
  );

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  return children;
};

export default ProtectLoggedRoute;
