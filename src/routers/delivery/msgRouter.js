import express from "express";
import {
  getDeliveryDones,
  getDeliveryToDos,
  updateDeliveryToDoItemToStatusTwo,
  updateDeliveryToDoItemToStatusThree,
} from "../../controllers/msgController";

const msgRouter = express.Router();

msgRouter.get("/todo", getDeliveryToDos);

msgRouter.post("/todo/2/:trackingnum", updateDeliveryToDoItemToStatusTwo);
msgRouter.post("/todo/3/:trackingnum", updateDeliveryToDoItemToStatusThree);

msgRouter.get("/done", getDeliveryDones);

export default msgRouter;
