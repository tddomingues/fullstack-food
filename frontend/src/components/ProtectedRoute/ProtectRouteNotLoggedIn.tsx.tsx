import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import { useNavigate } from "react-router-dom";

//proteger rota não estando logado
const ProtectRouteNotLoggedIn = ({ children }: { children: ReactNode }) => {
  const token = useSelector<IRootState, string | undefined>(
    (state) => state.user.token,
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/login", { replace: true });
  }, [token, navigate]);

  return children;
};

export default ProtectRouteNotLoggedIn;
