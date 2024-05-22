import { RefreshTokenProps } from "../interface/RefreshTokenProps";
import { UserProps } from "../interface/UserProps";
import RefreshToken from "../model/refreshToken";

export const createRefreshToken = async (user: UserProps) => {
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

export const verifyExpiration = (refreshToken: RefreshTokenProps) => {
  return refreshToken.expiryDate.getTime() < new Date().getTime();
};
