export const postJoin = (req, res) => {
  console.log(req.body);
  return res.send({ hello: "hello" });
};
