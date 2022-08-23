import express from "express";
import {
  getChattingHistoryTempIsFreez,
  getChattingHistoryTempIsRefrig,
  getChattingHistoryTempIsRoom,
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

userRouter.get("/order/:ordernum/0", getChattingHistoryTempIsRoom);
userRouter.get("/order/:ordernum/1", getChattingHistoryTempIsRefrig);
userRouter.get("/order/:ordernum/2", getChattingHistoryTempIsFreez);

export default userRouter;
