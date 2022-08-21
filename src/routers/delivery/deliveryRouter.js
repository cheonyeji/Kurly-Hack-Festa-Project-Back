import express from "express";
import csRouter from "./csRouter";
import msgRouter from "./msgRouter";

const deliveryRouter = express.Router();

deliveryRouter.use("/message", msgRouter);
deliveryRouter.use("/cs", csRouter);

export default deliveryRouter;
