import { Types } from "mongoose";

export interface UserProps {
  name: string;
  email: string;
  role: string;
  password: string;
  confirmPassword?: string;
  _id?: Types.ObjectId;
}
