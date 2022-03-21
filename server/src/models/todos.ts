import mongoose from "mongoose";

const todosSchema = new mongoose.Schema({
  text: { type: String, required: true },
  id: { type: Number, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const Todos = mongoose.model("Todos", todosSchema);

export default Todos;
