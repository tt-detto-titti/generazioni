const { verificaSignup } = require("../middlewares");
const controller = require("../controllers/auth.controller.js");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [verificaSignup.controllaEmailDoppia, verificaSignup.controllaRuolo],
    controller.signup
  );
  app.post("/api/auth/login", controller.login);
};
