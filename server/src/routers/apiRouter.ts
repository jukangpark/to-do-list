import express from "express";
import { getTodos, postTodos } from "../controllers/todoController";

const apiRouter = express.Router();

apiRouter.route("/todos").get(getTodos).post(postTodos);

export default apiRouter;
