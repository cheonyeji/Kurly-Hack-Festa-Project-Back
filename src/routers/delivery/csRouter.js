import express from "express";
import {
  getCSDones,
  getCSToDos,
  updateCSTodoItem,
} from "../../controllers/csController";

const csRouter = express.Router();

csRouter.get("/todo", getCSToDos);

csRouter.post("/todo/:trackingnum", updateCSTodoItem);

csRouter.get("/done", getCSDones);

export default csRouter;
