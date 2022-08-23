import express from "express";
import { getChattingHistory } from "../../controllers/chattingController";
import csRouter from "./csRouter";
import dLoginRouter from "./dLoginRouter";
import msgRouter from "./msgRouter";

const deliveryRouter = express.Router();

deliveryRouter.use("/msg", msgRouter);
deliveryRouter.use("/cs", csRouter);
deliveryRouter.use("/login", dLoginRouter);

deliveryRouter.get("/:trackingnum", getChattingHistory);

export default deliveryRouter;
