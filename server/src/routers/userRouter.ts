import express from "express";
import { postJoin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/join").post(postJoin);

export default userRouter;
