import { Document } from "mongoose";

export interface ProductProps extends Document {
  name: string | undefined;
  category: string | undefined;
  price: string | undefined;
  imageUrl: string | undefined;
  description: string | undefined;
}
