import mongoose from "mongoose";

const Empty = new mongoose.Schema({ any: [] });

const todosSchema = new mongoose.Schema({
  ["To Do"]: [Empty],
  Doing: [Empty],
  Done: [Empty],
  id: { type: Number, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const Todos = mongoose.model("Todos", todosSchema);

export default Todos;

// "To Do": [], Doing: [], Done: [] 로 된 객체여야만 함. Default 로 있는 프로퍼티?
// 그리고 이 객체는 더 늘어날 수도 있음...

// 스키마 배열 정의는 type: Array 이렇게 (x)
// [] 이런식?

//  src/controllers/todoController.ts(1,19): error TS2307: Cannot find module '../models/Todos' or its corresponding type declarations.
// -----> Build failed
