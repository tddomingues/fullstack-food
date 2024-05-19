import express, { Express } from "express";
import userRouter from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import main from "./config/db";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Express = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    exposedHeaders: ["Set-Cookie", "Date", "ETag"],
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/product", productRoutes);

main();

app.listen(3000, () => {
  console.log("Servidor ligado.");
});
