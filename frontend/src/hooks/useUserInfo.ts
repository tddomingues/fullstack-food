import { useEffect } from "react";

//interfaces
import { UserProps } from "../interfaces/UserProps";

//redux

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store";
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

  const success = useSelector<IRootState, boolean>(
    (state) => state.user.success,
  );

  const error = useSelector<IRootState, string[] | null>(
    (state) => state.user.error,
  );

  useEffect(() => {
    dispatch(getUser(token || ""));
  }, [dispatch, token]);

  return { user, token, loading, error, success };
};
