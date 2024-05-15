import { IRefreshToken } from "../interface/IRefreshToken";
import { IUser } from "../interface/IUser";
import RefreshToken from "../model/refreshToken";

export const createRefreshToken = async (user: IUser) => {
  let expiredAt = new Date();

  expiredAt.setSeconds(expiredAt.getSeconds() + Number(86400));

  console.log("user ", user);

  const token = "dced428eb23d5d0b206332814a7f2c39";

  let refreshToken = await RefreshToken.create({
    email: user?.email,
    token: token,
    expiryDate: expiredAt.getTime(),
  });

  return refreshToken;
};

export const verifyExpiration = (refreshToken: IRefreshToken) => {
  return refreshToken.expiryDate.getTime() < new Date().getTime();
};
