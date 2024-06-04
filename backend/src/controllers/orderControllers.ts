import Stripe from "stripe";

import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import Order from "../model/order";

//interfaces
import { OrderProps } from "../interface/OrderProps";
import { CartProps } from "../interface/CartProps";

const stripe = new Stripe(process.env.STRIPE_API_ACCESS_TOKEN || "");

interface PaymentProps {
  cart: CartProps[];
  userId: string;
}

const payment = async (request: Request, response: Response) => {
  const { cart, userId }: PaymentProps = request.body;

  try {
    if (!userId || !cart)
      return response
        .status(400)
        .json({ error: ["Id do usuário e/ou produtos não enviado."] });

    const customer = await stripe.customers.create({
      metadata: {
        userId,
      },
    });

    const line_items = cart.map((itemCart) => {
      return {
        price_data: {
          currency: "BRL",
          product_data: {
            name: itemCart.name,
            description: itemCart.name,
            metadata: {
              id: itemCart._id,
            },
          },
          unit_amount: itemCart.subTotalPrice * 100,
        },
        quantity: itemCart.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      metadata: customer.metadata,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["BR"],
      },
      success_url: "http://localhost:5173/successful-payment",
      cancel_url: "http://localhost:5173/",
    });

    return response.status(200).send({ url: session.url });
  } catch (error) {
    return response.status(400).json({ error: ["Erro ao fechar o pedido."] });
  }
};

const createOrder = async ({ address, userId, cart, status }: OrderProps) => {
  try {
    console.log(
      "address, userId, cart, status ",
      address,
      userId,
      cart,
      status,
    );

    const order = await Order.create({ address, userId, cart, status });

    return order;
  } catch (error) {
    console.log(error);
  }
};

const getOrdersByUser = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const orders = await Order.find({ userId: id });

    if (!orders)
      return response.status(400).json({ error: ["Pedidos não encontrados."] });

    return response.status(200).json(orders);
  } catch (error) {
    return response
      .status(400)
      .json({ error: ["Erro ao procurar os pedidos."] });
  }
};

export const orderControllers = { createOrder, payment, getOrdersByUser };
