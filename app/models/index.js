const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.url = "mongodb+srv://generazioni.e4br1v2.mongodb.net/?retryWrites=true&w=majority&appName=generazioni";
db.name = "generazioni";
db.user = "dev";
db.pass = "dev";

db.richieste = require("./richiesta.model.js")(mongoose);
db.utenti = require("./utente.model.js")(mongoose);

module.exports = db;
