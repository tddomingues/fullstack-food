import { useEffect } from "react";
import { getAddress } from "../slice/addressSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store";
import { AddressProps } from "../interfaces/AddressProps";

export const useAddress = () => {
  const dispatch = useDispatch<AppDispatch>();

  const address = useSelector<IRootState, AddressProps | null>(
    (state) => state.address.address,
  );

  const error = useSelector<IRootState, string[] | null>(
    (state) => state.address.error,
  );

  const loading = useSelector<IRootState, boolean>(
    (state) => state.address.loading,
  );

  return { address, error, loading };
};
