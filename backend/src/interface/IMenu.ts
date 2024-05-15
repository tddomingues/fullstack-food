import { Document } from "mongoose";

export interface IMenu extends Document {
  name: string | undefined;
  category: string | undefined;
  price: number | undefined;
  imageUrl: string | undefined;
}
