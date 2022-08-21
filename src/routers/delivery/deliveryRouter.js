import express from "express";
import csRouter from "./csRouter.js";
import msgRouter from "./msgRouter.js";

const deliveryRouter = express.Router();

deliveryRouter.use("/message", msgRouter);
deliveryRouter.use("/cs", csRouter);

export default deliveryRouter;
