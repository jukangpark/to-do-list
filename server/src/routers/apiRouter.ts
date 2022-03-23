import express from "express";
import { verifyToken } from "../middleware/authorization";
import { getTodos, postTodos } from "../controllers/todoController";

const apiRouter = express.Router();

apiRouter
  .route("/todos")
  .get(verifyToken, getTodos)
  .post(verifyToken, postTodos);

export default apiRouter;
