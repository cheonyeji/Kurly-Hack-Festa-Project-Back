import express from "express";
import csRouter from "./csRouter";
import dLoginRouter from "./dLoginRouter";
import msgRouter from "./msgRouter";

const deliveryRouter = express.Router();

deliveryRouter.use("/msg", msgRouter);
deliveryRouter.use("/cs", csRouter);
deliveryRouter.use("/login", dLoginRouter);

export default deliveryRouter;
