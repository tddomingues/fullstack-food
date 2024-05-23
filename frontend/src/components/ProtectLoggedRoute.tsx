import { ReactNode, useEffect } from "react";

//router
import { useNavigate } from "react-router-dom";

//hooks
import { useUserInfo } from "../hooks/useUserInfo";

//proteger rota logado
const ProtectLoggedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useUserInfo();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/", { replace: true });
  }, [token, navigate]);

  return children;
};

export default ProtectLoggedRoute;
