import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  profileImageUrl: String,
  password: { type: String },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todos" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
}); // 해시함수 를 통해 비밀 번호 암호화

const User = mongoose.model("User", userSchema);

export default User;
