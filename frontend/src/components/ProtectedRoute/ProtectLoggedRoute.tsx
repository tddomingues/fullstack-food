import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import { useNavigate } from "react-router-dom";

//proteger rota logado
const ProtectLoggedRoute = ({ children }: { children: ReactNode }) => {
  const token = useSelector<IRootState, string | undefined>(
    (state) => state.user.token,
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/", { replace: true });
  }, [token, navigate]);

  return children;
};

export default ProtectLoggedRoute;
