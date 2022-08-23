import express from "express";
import {
  getCSDones,
  getCSToDos,
  updateCSTodoItemToStatusThree,
} from "../../controllers/csController";

const csRouter = express.Router();

csRouter.get("/todo", getCSToDos);

csRouter.post("/todo/:trackingnum", updateCSTodoItemToStatusThree);

csRouter.get("/done", getCSDones);

export default csRouter;
