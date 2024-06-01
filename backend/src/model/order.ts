import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  address: {
    city: String,
    country: String,
    line1: String,
    line2: String,
    postal_code: String,
    state: String,
  },
  status: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cart: [
    {
      name: String,
      quantity: Number,
      subTotalPrice: Number,
    },
  ],
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
