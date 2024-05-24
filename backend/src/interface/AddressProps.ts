import { Types } from "mongoose";

export interface AddressProps {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  userId: Types.ObjectId;
}
