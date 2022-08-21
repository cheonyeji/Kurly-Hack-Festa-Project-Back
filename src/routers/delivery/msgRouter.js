import express from "express";
import {
  getDeliveryDones,
  getDeliveryToDos,
  getDeliveryToDoItem,
  updateDeliveryToDoItem,
} from "../../controllers/msgController.js";

const msgRouter = express.Router();

msgRouter.get("/todo", getDeliveryToDos);

msgRouter
  .route("/todo/:trackingnum")
  .get(getDeliveryToDoItem)
  .post(updateDeliveryToDoItem);

msgRouter.get("/done", getDeliveryDones);

export default msgRouter;
