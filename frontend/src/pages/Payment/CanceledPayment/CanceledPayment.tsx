import React from "react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";

const CanceledPayment = () => {
  const navigate = useNavigate();

  return (
    <section className="place-items-center grid">
      <div className="rounded-md bg-neutral-800 p-4">
        <h2 className="font-semibold text-lg mb-4">
          Ops! Ocorreu algum erro, tente novamente.
        </h2>
        <Button onClick={() => navigate("/check-order")}>Voltar</Button>
      </div>
    </section>
  );
};

export default CanceledPayment;
