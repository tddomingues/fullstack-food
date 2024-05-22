import axios, { AxiosError } from "axios";
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
    .then((res) => res.data)
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
  try {
    const res = await api.get("/logout");

    return res.data;
  } catch (error) {
    return console.log(error);
  }
};

const getUser = async (token: string) => {
  console.log(token);

  try {
    const res = await api.get("/getUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return console.log(error);
  }
};

export const userService = { login, logout, getUser, register };
