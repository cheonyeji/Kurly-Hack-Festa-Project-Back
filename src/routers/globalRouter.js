import express from "express";

const globalRouter = express.Router();

const handleHome = (req, res) => res.send("메인화면");

globalRouter.get("/", handleHome);

export default globalRouter;
