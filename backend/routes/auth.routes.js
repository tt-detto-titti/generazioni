const { verificaSignup } = require('../middlewares');
const controller = require('../controllers/auth.controller.js');

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  /*                 Versione 1                 */
  // SignUp
  app.post(
    '/api/auth/signup',
    [
      verificaSignup.controllaEmailDoppia,
      verificaSignup.controllaCFDoppio,
      verificaSignup.controllaTelefonoDoppio,
      verificaSignup.controllaRuolo
    ],
    controller.signup
  );
  // Login
  app.post('/api/auth/login', controller.login);

  /*                 Versione 2                 */
  // SignUp v2
  app.post(
    '/apiv2/auth/signup',
    [
      verificaSignup.controllaEmailDoppia,
      verificaSignup.controllaCFDoppio,
      verificaSignup.controllaTelefonoDoppio,
      verificaSignup.controllaRuolo
    ],
    controller.signup
  );
  // Login v2
  app.post('/apiv2/auth/login', controller.login);
};
