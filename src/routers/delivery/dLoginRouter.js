import express from "express";
import { kurlyveryLogin } from "../../controllers/loginController";

const dLoginRouter = express.Router();

dLoginRouter.post("/", kurlyveryLogin);

export default dLoginRouter;
