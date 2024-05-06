const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.richieste = require("./richiesta.model.js")(mongoose);
db.utenti = require("./utente.model.js")(mongoose);

module.exports = db;
