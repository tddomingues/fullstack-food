import { Types } from "mongoose";

export interface IRefreshToken {
  token: string;
  email: string;
  expiryDate: Date;
  _id?: Types.ObjectId;
}
