import express from "express";
import {
  getOrderItems,
  getOrdernumItem,
  setCSOrdernumItem,
} from "../../controllers/userController.js";
import uploadImage from "../../multer.js";
import uLoginRouter from "./uLoginRouter.js";

const userRouter = express.Router();

userRouter.use("/login", uLoginRouter);
userRouter.get("/order", getOrderItems);
userRouter.get("/order/:ordernum", getOrdernumItem);
userRouter.post("/order/:ordernum", uploadImage, setCSOrdernumItem);

export default userRouter;
