import { Request, Response } from "express";
import Stripe from "stripe";

import dotenv from "dotenv";
dotenv.config();

//controller
import { orderControllers } from "../controllers/orderControllers";

const stripe = new Stripe(process.env.STRIPE_API_ACCESS_TOKEN || "");

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookStriper = async (request: Request, response: Response) => {
  const sig = request.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  let data;
  let eventType;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, webhookSecret);
    eventType = event.type;
    data = event.data.object;
    let cart;

    if (eventType === "checkout.session.completed") {
      await stripe.checkout.sessions
        .listLineItems(data.id)
        .then((res) => {
          cart = res.data.map((item) => {
            return {
              subTotalPrice: item.amount_subtotal / 100,
              name: item.description,
              quantity: item.quantity,
            };
          });

          return cart;
        })
        .catch((err) => console.log(err));

      const order = {
        address: data.customer_details.address,
        userId: data.metadata.userId,
        status: data.status,
        cart,
      };

      await orderControllers.createOrder(order);
    }
  } catch (error) {
    console.log(`Error message: ${error.message}`);
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  response.json({ received: true });
};

export default webhookStriper;
