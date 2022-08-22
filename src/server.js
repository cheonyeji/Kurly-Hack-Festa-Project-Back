import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import deliveryRouter from "./routers/delivery/deliveryRouter";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/user/userRouter";

const app = express();

const logger = morgan("dev");

app.use(logger);
app.use(bodyParser.json());

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/delivery", deliveryRouter);

export default app;
