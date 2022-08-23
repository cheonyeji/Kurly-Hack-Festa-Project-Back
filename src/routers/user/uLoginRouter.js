import express from "express";
import { userLogin } from "../../controllers/loginController";

const uLoginRouter = express.Router();

uLoginRouter.post("/", userLogin);

export default uLoginRouter;
