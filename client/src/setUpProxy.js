const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // localhost:9000/api
    createProxyMiddleware({
      target: "http://localhost:9000", // 서버의 포트를 여기에 작성해주면됨.
      changeOrigin: true, // cross Origin 가능하게.
    })
  );

  app.use(
    "/user",
    // localhost:9000/user
    createProxyMiddleware({
      target: "http://localhost:9000", // 서버의 포트를 여기에 작성해주면됨.
      changeOrigin: true, // cross Origin 가능하게.
    })
  );
};

// proxy 설정 때문에 /user 또는 /api 하나만 가능함.
