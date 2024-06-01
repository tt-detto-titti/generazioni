const controller = require("../controllers/feedback.controller.js");
var router = require("express").Router();

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    //Crea un nuovo feedback
    router.post("/add", controller.nuovoFeedback);
    app.use("/api/feedback", authJwt.verificaToken, router);
};