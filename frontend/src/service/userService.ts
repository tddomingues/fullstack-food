import axios from "axios";
import { UserProps } from "../interfaces/UserProps";

const api = axios.create({
  baseURL: "http://localhost:3000/user",
});

type UserDataForLogin = Omit<UserProps, "name" | "confirmPassword" | "role">;

interface UserDataForRegisterProps extends UserProps {
  confirmPassword: string;
}

const login = async (user: UserDataForLogin) => {
  const res = await api
    .post("/login", user, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => err.response.data);

  return res;
};

const register = async (user: UserDataForRegisterProps) => {
  const res = await api
    .post("/register", user)
    .then((res) => res.data)
    .catch((err) => err.response.data);

  return res;
};

const logout = async () => {
  const res = await api
    .get("/logout")
    .then((res) => res.data)
    .catch((err) => err.response.data);

  return res;
};

const getUser = async (token: string) => {
  const res = await api
    .get("/getUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);

  return res;
};

export const userService = { login, logout, getUser, register };
