import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../store";
import { getOrdersByUser } from "../../slice/orderSlice";
import { useParams } from "react-router-dom";
import { OrderProps } from "../../interfaces/OrderProps";
import Navbar from "../../components/Navbar";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import formatCurrency from "../../utils/formatCurrency";

const Orders = () => {
  const { id } = useParams();

  const userId = id;

  const dispatch = useDispatch<AppDispatch>();

  const orders = useSelector<IRootState, OrderProps[]>(
    (state) => state.order.orders,
  );

  console.log(orders);

  const totalPrice = (order) => {
    return order.cart.reduce((prev, curr) => {
      return prev + curr.subTotalPrice;
    }, 0);
  };

  useEffect(() => {
    userId && dispatch(getOrdersByUser(userId));
  }, [dispatch, userId]);

  return (
    <>
      <Navbar />
      <main>
        <section>
          <Table>
            <TableCaption>Seus Pedidos.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Produtos</TableHead>

                <TableHead className="text-right">Preço Total</TableHead>
              </TableRow>
            </TableHeader>
            {orders &&
              orders.map((order) => (
                <TableBody key={order._id}>
                  <TableRow>
                    <TableCell className="font-medium">{order._id}</TableCell>
                    <TableCell>
                      {order.status === "complete" && "Completo"}
                    </TableCell>
                    <TableCell>
                      <ul>
                        {order.cart.map((item) => (
                          <li>
                            {item.name} (qtd: {item.quantity})
                          </li>
                        ))}
                      </ul>
                    </TableCell>

                    <TableCell className="text-right">
                      {formatCurrency(totalPrice(order))}
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </section>
      </main>
    </>
  );
};

export default Orders;
