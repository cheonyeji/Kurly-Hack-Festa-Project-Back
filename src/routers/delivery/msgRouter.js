import express from "express";
import {
  getDeliveryDones,
  getDeliveryToDos,
  updateDeliveryToDoItemToStatusTwo,
  updateDeliveryToDoItemToStatusThree,
} from "../../controllers/msgController";
import uploadImage from "../../multer";

const msgRouter = express.Router();

msgRouter.get("/todo", getDeliveryToDos);

msgRouter.post(
  "/todo/2/:trackingnum",
  uploadImage,
  updateDeliveryToDoItemToStatusTwo
);
msgRouter.post(
  "/todo/3/:trackingnum",
  uploadImage,
  updateDeliveryToDoItemToStatusThree
);

msgRouter.get("/done", getDeliveryDones);

export default msgRouter;
