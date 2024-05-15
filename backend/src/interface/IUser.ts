import { Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  _id?: Types.ObjectId;
}
