import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.qorwkio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const main = async () => {
  await mongoose
    .connect(url)
    .then(() => {
      console.log("Conectado ao banco de dados.");
    })
    .catch(() => {
      console.log("Falha ao conectar ao banco de dados");
    });
};

export default main;
