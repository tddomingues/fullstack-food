import express, { Express } from "express";
import userRouter from "./routes/userRoutes";
import menuRoutes from "./routes/menuRoutes";
import main from "./config/db";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/menu", menuRoutes);

main();

app.listen(3000, () => {
  console.log("Servidor ligado.");
});
