import mongoose from "mongoose";

const todosSchema = new mongoose.Schema({
  ["To Do"]: { type: Array },
  Doing: { type: Array },
  Done: { type: Array },
  id: { type: Number, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const Todos = mongoose.model("Todos", todosSchema);

export default Todos;

// "To Do": [], Doing: [], Done: [] 로 된 객체여야만 함. Default 로 있는 프로퍼티?
// 그리고 이 객체는 더 늘어날 수도 있음...
