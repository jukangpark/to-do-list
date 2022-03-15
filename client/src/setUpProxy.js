const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // localhost:9000/api 에 들어가는 요청에 대해 수행할 미들웨어입니다.
    createProxyMiddleware({
      target: "http://localhost:9000", // 서버의 포트를 여기에 작성해주면됨.
      changeOrigin: true, // cross Origin 가능하게.
    })
  );
};
