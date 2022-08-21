import express from "express";
import {
  getCSDones,
  getCSTodoItem,
  getCSToDos,
  updateCSTodoItem,
} from "../../controllers/csController.js";

const csRouter = express.Router();

csRouter.get("/todo", getCSToDos);

csRouter.route("/todo/:trackingnum").get(getCSTodoItem).post(updateCSTodoItem);

csRouter.get("/done", getCSDones);

export default csRouter;
