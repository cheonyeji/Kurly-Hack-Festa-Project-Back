import express from "express";
import morgan from "morgan";
import deliveryRouter from "./routers/delivery/deliveryRouter.js";
import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/user/userRouter.js";

const app = express();

const logger = morgan("dev");

app.use(logger);

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/delivery", deliveryRouter);

export default app;
