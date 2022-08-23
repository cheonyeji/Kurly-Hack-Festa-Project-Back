import express from "express";
import {
  getCSDones,
  getCSToDos,
  updateCSTodoItemToStatusThree,
} from "../../controllers/csController";
import uploadImage from "../../multer";

const csRouter = express.Router();

csRouter.get("/todo", getCSToDos);

csRouter.post("/todo/:trackingnum", uploadImage, updateCSTodoItemToStatusThree);

csRouter.get("/done", getCSDones);

export default csRouter;
