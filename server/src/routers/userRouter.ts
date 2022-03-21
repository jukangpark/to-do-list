import express from "express";
import { login, join, getUserInfo } from "../controllers/userController";
import { verifyToken } from "../middleware/authorization";

const userRouter = express.Router();

userRouter.route("/join").post(join);
userRouter.route("/login").post(login);
userRouter.route("/info").get(verifyToken, getUserInfo);

export default userRouter;
