import express, { Application } from "express";
import apiRouter from "./routers/apiRouter";
import morgan from "morgan";

const app: Application = express();
const PORT = process.env.PORT || 9000;

const logger = morgan("dev");
app.use(logger);
app.use(express.static("build"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/build/index.html");
});

app.use("/api", apiRouter);

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(PORT, () => {
  console.log("hello world!");
});
