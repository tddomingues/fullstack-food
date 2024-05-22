import { Document } from "mongoose";

export interface MenuProps extends Document {
  name: string | undefined;
  category: string | undefined;
  price: string | undefined;
  imageUrl: string | undefined;
  description: string | undefined;
}
