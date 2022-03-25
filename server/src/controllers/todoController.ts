import Todos from "../models/Todos";
import { Request, Response } from "express";

export const getTodos = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const { user_id: _id } = user;
  const todos = await Todos.findOne({ owner: _id });
  if (todos) {
    return res.send(todos);
  }
  return res.send({ message: "DB 에 해당 유저의 todos가 없습니다" });
};

export const postTodos = async (req: Request, res: Response) => {
  const { Doing, Done } = req.body;
  const ToDo = req.body["To Do"];
  const _id = res.locals.user.user_id;
  const todo = await Todos.findOne({ owner: _id });

  if (todo) {
    todo["To Do"] = ToDo;
    todo.Doing = Doing;
    todo.Done = Done;
    await todo.save();
    return res.send({ message: "업데이트 완료" });
  }
  // 모조건 Todos 객체를 생성하게 되면 db에 데이터가 너무 많이 쌓여요..
  await Todos.create({
    "To Do": ToDo,
    Doing,
    Done,
    owner: _id,
  });
  // 요청이 여러번 되어지고 삭제가 되버림 이거 왜이런거임?
  return res.status(200).send({ hello: "postTodos" }).end();
};
