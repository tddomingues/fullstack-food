import { Types } from "mongoose";

export interface RefreshTokenProps {
  token: string;
  email: string;
  expiryDate: Date;
  _id?: Types.ObjectId;
}
