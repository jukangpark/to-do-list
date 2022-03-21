import User from "../models/User";
import bcyrpt from "bcrypt";
import jwt from "jsonwebtoken";

export const join = async (req, res) => {
  const { id, password } = req.body;
  const exists = await User.findOne({ id });
  if (exists) {
    return res
      .status(400)
      .send({ message: "해당 이메일을 가진 계정이 존재합니다." })
      .end();
  }
  try {
    await User.create({
      id,
      password,
    });
  } catch (error) {
    return res.status(400).send({ message: "에러가 발생했습니다." }).end();
  }

  return res
    .status(200)
    .send({ result: "ok", message: "회원 가입 완료" })
    .end();
};

export const login = async (req, res) => {
  const { id, password } = req.body;

  const user = await User.findOne({ id });

  if (!user) {
    return res
      .status(400)
      .send({ message: "아이디가 존재하지 않습니다." })
      .end();
  }

  const ok = await bcyrpt.compare(password, user.password);

  if (!ok) {
    return res
      .status(400)
      .send({ message: "비밀 번호가 일치하지 않습니다." })
      .end();
  }

  const token = jwt.sign(
    {
      user_id: user._id,
    },
    process.env.SECRET_KEY || "secret key",
    {
      expiresIn: "7d",
    }
  );
  // jwt 에 넣을 사용자 정보는 절대 비밀번호나 주민번호와 같은
  // 민감한 정보를 담고 있어서는 안된다.

  res.cookie("user", token); // token 은 JSON 으로 변환되어 클라이언트로 보내짐.
  return res.status(201).send({
    result: "ok",
    token,
    message: "로그인 완료",
  });
};

export const getUserInfo = async (req, res) => {
  const user = res.locals.user;

  const findUser = await User.findById(user.user_id);

  return res.status(200).json(findUser).end();
};
