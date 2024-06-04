import express, { Express } from "express";

import main from "./config/db";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import userRouter from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import { orderRoutes } from "./routes/orderRoutes";

const app: Express = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    exposedHeaders: ["Set-Cookie", "Date", "ETag"],
  }),
);

app.use("/order/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/order", orderRoutes);
app.use("/user", userRouter);
app.use("/product", productRoutes);

main();

app.listen(3000, () => {
  console.log("Servidor ligado.");
});
