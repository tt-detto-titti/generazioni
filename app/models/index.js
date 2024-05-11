const mongoose = require("mongoose");
const config = require("../config/auth.config.js");

const db = {};
mongoose.Promise = global.Promise;
db.mongoose = mongoose;

db.url = "mongodb+srv://generazioni.e4br1v2.mongodb.net/?retryWrites=true&w=majority&appName=generazioni";
db.name = "generazioni";
db.user = "dev";
db.pass = "dev";

db.richiesta = require("./richiesta.model.js")(mongoose);
db.ruolo = require("./ruolo.model.js")(mongoose);
db.utente = require("./utente.model.js")(mongoose);

db.RUOLI = config.ruoli;

module.exports = db;
