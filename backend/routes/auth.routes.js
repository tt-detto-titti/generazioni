const { verificaSignup } = require("../middlewares");
const controller = require("../controllers/auth.controller.js");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
    );
    next();
  });

  // SignUp
  app.post(
    "/api/auth/signup",
    [
      verificaSignup.controllaEmailDoppia,
      verificaSignup.controllaCFDoppio,
      verificaSignup.controllaTelefonoDoppio,
      verificaSignup.controllaRuolo,
    ],
    controller.signup,
  );
  // Login
  app.post("/api/auth/login", controller.login);
};
