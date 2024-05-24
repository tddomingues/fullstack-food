import express, { Express } from "express";
import userRouter from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import main from "./config/db";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { addressRoutes } from "./routes/addressRoutes";

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
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/user", userRouter);
app.use("/product", productRoutes);
app.use("/address", addressRoutes);

main();

app.listen(3000, () => {
  console.log("Servidor ligado.");
});
