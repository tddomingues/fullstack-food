import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store";
import { UserProps } from "../interfaces/UserProps";
import { useEffect } from "react";
import { getUser } from "../slice/userSlice";

export const useUserInfo = () => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector<IRootState, UserProps | null>(
    (state) => state.user.user,
  );

  const token = useSelector<IRootState, string | undefined>(
    (state) => state.user.token,
  );

  const loading = useSelector<IRootState, boolean>(
    (state) => state.user.loading,
  );

  useEffect(() => {
    dispatch(getUser(token || ""));
  }, [dispatch, token]);

  return { user, token, loading };
};
