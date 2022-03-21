const isHeroku = process.env.NODE_ENV === "production";
import dotenv from "dotenv";
import path from "path";

(() => {
  if (isHeroku) return; // 해로쿠 환경에서는 이 즉시 실행함수가 실행되지 않도록 막는다.
  const result = dotenv.config({ path: path.join(__dirname, "..", ".env") });
  // .env 파일의 경로를 dotenv.config 에 넘겨주고 성공여부를 저장함.
  if (result.parsed == undefined)
    // .env 파일 parsing 성공 여부 확인
    throw new Error("Cannot loaded environment variables file."); // parsing 실패시 Throwing
})();

import "./db";
import express, { Application } from "express";
import apiRouter from "./routers/apiRouter";
import morgan from "morgan";
import userRouter from "./routers/userRouter";

const app: Application = express();
const PORT = process.env.PORT || 9000;

const logger = morgan("dev");
app.use(logger);
app.use(express.static("build"));
app.use(express.json()); // body-parser 는 내장되어 있기 때문에, json 파싱하기 위해 설정 추가.

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/build/index.html");
});

app.use("/api", apiRouter);
app.use("/user", userRouter);

app.get("*", (req, res) => {
  if (isHeroku) {
    res.sendFile(__dirname + "/build/index.html");
  }
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(PORT, () => {
  console.log("hello world!");
});
