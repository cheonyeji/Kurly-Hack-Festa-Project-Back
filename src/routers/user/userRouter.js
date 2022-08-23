import express from "express";
import {
  getOrderItems,
  getOrdernumItem,
  setCSOrdernumItem,
} from "../../controllers/userController.js";
import uLoginRouter from "./uLoginRouter.js";

const userRouter = express.Router();

userRouter.use("/login", uLoginRouter);
userRouter.get("/order", getOrderItems);
userRouter.get("/order/:ordernum", getOrdernumItem);
userRouter.post("/order/:ordernum", setCSOrdernumItem);

export default userRouter;
