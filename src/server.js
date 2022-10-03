import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import categoriesRouter from "./routes/categoriesRouter.js";
import customersRouter from "./routes/customersRouter.js";
import gamesRouter from "./routes/gamesRouter.js";
import rentalsRouter from "./routes/rentalsRouter.js";

const server = express();

dotenv.config();

server
  .use(cors())
  .use(express.json())
  .use(categoriesRouter)
  .use(customersRouter)
  .use(gamesRouter)
  .use(rentalsRouter)
  .listen(process.env.PORT);
