import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/user",
});

const login = async (user: { email: string; password: string }) => {
  try {
    const res = await api.post("/login", user, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return console.log(error);
  }
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

export const userService = { login, logout, getUser };
