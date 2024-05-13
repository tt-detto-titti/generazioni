const mongoose = require("mongoose");

const db = {};
mongoose.Promise = global.Promise;
db.mongoose = mongoose;

db.url = "mongodb+srv://generazioni.e4br1v2.mongodb.net/?retryWrites=true&w=majority&appName=generazioni";
db.name = "generazioni";
db.user = "dev";
db.pass = "dev";

db.categoria_aiuto = require("./categoria_aiuto.model.js")(mongoose);
db.richiesta = require("./richiesta.model.js")(mongoose);
db.ruolo = require("./ruolo.model.js")(mongoose);
db.utente = require("./utente.model.js")(mongoose);

module.exports = db;
